import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const PCBuilderContext = createContext();

const initialBuild = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  psu: null,
  cooler: null,
  case: null
};

export const PCBuilderProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [componentsLoading, setComponentsLoading] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const data = await api.getComponents();
        setComponents(data);
      } catch (err) {
        console.error('Failed to fetch components:', err);
      } finally {
        setComponentsLoading(false);
      }
    };
    loadComponents();
  }, []);

  const [build, setBuild] = useState(() => {
    const saved = localStorage.getItem('pc_build');
    return saved ? JSON.parse(saved) : initialBuild;
  });

  const [savedBuilds, setSavedBuilds] = useState(() => {
    const saved = localStorage.getItem('pc_saved_builds');
    return saved ? JSON.parse(saved) : [
      {
        id: 'build-1',
        name: 'Ultimate 4K Gaming Machine',
        date: '2026-07-10',
        parts: {
          cpu: { id: 'cpu-intel-i7-14700k', name: 'Intel Core i7-14700K', price: 389.99, category: 'cpu' },
          gpu: { id: 'gpu-nvidia-rtx-4080-super', name: 'ASUS ROG Strix RTX 4080 Super OC', price: 1099.99, category: 'gpu' },
          motherboard: { id: 'mobo-asus-z790-f', name: 'ASUS ROG Strix Z790-F Gaming WiFi II', price: 359.99, category: 'motherboard' },
          ram: { id: 'ram-corsair-vengeance-32', name: 'Corsair Vengeance RGB 32GB DDR5', price: 99.99, category: 'ram' },
          storage: { id: 'storage-samsung-990-pro', name: 'Samsung 990 Pro 2TB M.2 SSD', price: 169.99, category: 'storage' },
          psu: { id: 'psu-corsair-rm850x', name: 'Corsair RM850x 850W Gold', price: 129.99, category: 'psu' },
          cooler: { id: 'cooler-corsair-h150i', name: 'Corsair iCUE H150i 360mm AIO', price: 189.99, category: 'cooler' },
          case: { id: 'case-lian-li-o11', name: 'Lian Li O11 Dynamic EVO Mid-Tower', price: 149.99, category: 'case' }
        },
        totalPrice: 2589.92
      }
    ];
  });

  const [compatibility, setCompatibility] = useState({
    status: 'compatible', // compatible, warning, error
    messages: [],
    estimatedWattage: 0
  });

  useEffect(() => {
    localStorage.setItem('pc_build', JSON.stringify(build));
    checkCompatibility();
  }, [build]);

  useEffect(() => {
    localStorage.setItem('pc_saved_builds', JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  const addComponentToBuild = (categoryKey, component) => {
    setBuild(prev => ({
      ...prev,
      [categoryKey]: component
    }));
  };

  const removeComponentFromBuild = (categoryKey) => {
    setBuild(prev => ({
      ...prev,
      [categoryKey]: null
    }));
  };

  const clearBuild = () => {
    setBuild(initialBuild);
  };

  const checkCompatibility = () => {
    const messages = [];
    let status = 'compatible';
    let wattage = 50; // base system wattage (motherboard, RAM, storage)

    const { cpu, gpu, motherboard, ram, psu, cooler, case: pcCase } = build;

    // Calculate wattage
    if (cpu) wattage += cpu.specs.tdp || 65;
    if (gpu) wattage += gpu.specs.tdp || 150;
    if (cooler) wattage += 20;

    // Check CPU + Motherboard Socket
    if (cpu && motherboard) {
      if (cpu.specs.socket !== motherboard.specs.socket) {
        status = 'error';
        messages.push({
          type: 'error',
          text: `CPU socket (${cpu.specs.socket}) is incompatible with Motherboard socket (${motherboard.specs.socket}).`
        });
      } else {
        messages.push({
          type: 'success',
          text: `CPU and Motherboard match socket (${cpu.specs.socket}).`
        });
      }
    }

    // Check Motherboard + Case Form Factor
    if (motherboard && pcCase) {
      const moboFormFactor = motherboard.specs.formFactor;
      const supportedFactors = pcCase.specs.supportedFormFactors || [];
      if (!supportedFactors.includes(moboFormFactor)) {
        status = 'error';
        messages.push({
          type: 'error',
          text: `Motherboard form factor (${moboFormFactor}) is not supported by Case (${pcCase.name} supports: ${supportedFactors.join(', ')}).`
        });
      } else {
        messages.push({
          type: 'success',
          text: `Case supports Motherboard form factor (${moboFormFactor}).`
        });
      }
    }

    // Check PSU Wattage compatibility
    if (psu) {
      const psuWattage = psu.specs.wattage;
      const requiredWattage = wattage + 100; // 100W buffer
      if (psuWattage < requiredWattage) {
        if (status !== 'error') status = 'warning';
        messages.push({
          type: 'warning',
          text: `Power supply wattage (${psuWattage}W) is lower than recommended wattage (${requiredWattage}W) for this config.`
        });
      } else {
        messages.push({
          type: 'success',
          text: `Power supply wattage (${psuWattage}W) is sufficient (Estimated build load: ${wattage}W).`
        });
      }
    } else if (cpu || gpu) {
      if (status !== 'error') status = 'warning';
      messages.push({
        type: 'info',
        text: `Add a Power Supply (PSU) to check power budget compatibility (Estimated load: ${wattage}W).`
      });
    }

    // Check Cooler Socket compatibility
    if (cpu && cooler) {
      const coolerSockets = cooler.specs.sockets || [];
      if (!coolerSockets.includes(cpu.specs.socket)) {
        if (status !== 'error') status = 'warning';
        messages.push({
          type: 'warning',
          text: `CPU Cooler socket support may not include CPU's socket (${cpu.specs.socket}). Check brackets.`
        });
      } else {
        messages.push({
          type: 'success',
          text: `Cooler natively supports CPU socket (${cpu.specs.socket}).`
        });
      }
    }

    // If nothing has been added
    if (messages.length === 0) {
      messages.push({
        type: 'info',
        text: 'Start adding components to check system compatibility in real-time!'
      });
    }

    setCompatibility({
      status,
      messages,
      estimatedWattage: wattage
    });
  };

  const getBuildTotal = () => {
    return Object.values(build).reduce((sum, item) => {
      return sum + (item ? item.price : 0);
    }, 0);
  };

  const isBuildComplete = () => {
    // A build is considered complete/functional if it has cpu, motherboard, ram, storage, psu, case
    return !!(build.cpu && build.motherboard && build.ram && build.storage && build.psu && build.case);
  };

  const saveBuild = (name) => {
    const newBuild = {
      id: `build-${Date.now()}`,
      name: name || `My Custom Build #${savedBuilds.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      parts: { ...build },
      totalPrice: getBuildTotal()
    };
    setSavedBuilds(prev => [newBuild, ...prev]);
    return newBuild;
  };

  const deleteBuild = (id) => {
    setSavedBuilds(prev => prev.filter(b => b.id !== id));
  };

  return (
    <PCBuilderContext.Provider
      value={{
        components,
        componentsLoading,
        build,
        savedBuilds,
        compatibility,
        addComponentToBuild,
        removeComponentFromBuild,
        clearBuild,
        getBuildTotal,
        isBuildComplete,
        saveBuild,
        deleteBuild
      }}
    >
      {children}
    </PCBuilderContext.Provider>
  );
};

export const usePCBuilder = () => useContext(PCBuilderContext);
