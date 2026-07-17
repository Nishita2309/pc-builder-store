package com.pcbuilderstore.backend.config;

import com.pcbuilderstore.backend.entity.*;
import com.pcbuilderstore.backend.enums.*;
import com.pcbuilderstore.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ComponentRepository componentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed users
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@pcbuilder.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(RoleType.ADMIN)
                    .accountStatus(AccountStatus.ACTIVE)
                    .build();
            userRepository.save(admin);

            User customer = User.builder()
                    .firstName("Customer")
                    .lastName("User")
                    .email("customer@pcbuilder.com")
                    .passwordHash(passwordEncoder.encode("customer123"))
                    .role(RoleType.CUSTOMER)
                    .accountStatus(AccountStatus.ACTIVE)
                    .build();
            userRepository.save(customer);
        }

        // Seed brands
        if (brandRepository.count() == 0) {
            String[] brandNames = {"Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Corsair", "Gigabyte", "Samsung"};
            for (String name : brandNames) {
                Brand brand = Brand.builder()
                        .name(name)
                        .description(name + " hardware components")
                        .build();
                brandRepository.save(brand);
            }
        }

        // Seed categories
        if (categoryRepository.count() == 0) {
            String[][] categoriesData = {
                {"Processors (CPU)", "The brain of your computer. Choose between Intel and AMD."},
                {"Graphics Cards (GPU)", "Powers gaming, video editing, and rendering performance."},
                {"Motherboards", "Connects all your components together."},
                {"Memory (RAM)", "High-speed system memory for multitasking and gaming."},
                {"Storage (SSD/HDD)", "Fast NVMe SSDs and spacious HDDs for your files."},
                {"Power Supplies (PSU)", "Delivers clean and reliable power to your system."},
                {"CPU Coolers", "Keeps CPU temperatures low under heavy workloads."},
                {"PC Cases", "Housing for your build with varying airflow and sizes."}
            };
            for (String[] data : categoriesData) {
                Category category = Category.builder()
                        .name(data[0])
                        .description(data[1])
                        .build();
                categoryRepository.save(category);
            }
        }

        // Seed components
        if (componentRepository.count() == 0) {
            // Find categories
            Category cpuCat = categoryRepository.findByName("Processors (CPU)").orElseThrow();
            Category gpuCat = categoryRepository.findByName("Graphics Cards (GPU)").orElseThrow();
            Category moboCat = categoryRepository.findByName("Motherboards").orElseThrow();
            Category ramCat = categoryRepository.findByName("Memory (RAM)").orElseThrow();
            Category storageCat = categoryRepository.findByName("Storage (SSD/HDD)").orElseThrow();
            Category psuCat = categoryRepository.findByName("Power Supplies (PSU)").orElseThrow();
            Category coolerCat = categoryRepository.findByName("CPU Coolers").orElseThrow();
            Category caseCat = categoryRepository.findByName("PC Cases").orElseThrow();

            // Find brands
            Brand intel = brandRepository.findByName("Intel").orElseThrow();
            Brand amd = brandRepository.findByName("AMD").orElseThrow();
            Brand asus = brandRepository.findByName("ASUS").orElseThrow();
            Brand msi = brandRepository.findByName("MSI").orElseThrow();
            Brand corsair = brandRepository.findByName("Corsair").orElseThrow();
            Brand gigabyte = brandRepository.findByName("Gigabyte").orElseThrow();
            Brand samsung = brandRepository.findByName("Samsung").orElseThrow();

            // 1. CPUs
            createComponent("Intel Core i7-14700K", "14700K", "Intel Core i7-14700K desktop processor. 20 cores (8 P-cores + 12 E-cores).", 389.99, ComponentType.CPU, intel, cpuCat,
                new Object[]{SpecificationKey.SOCKET, "LGA1700", SpecificationKey.CORES, "20", SpecificationKey.THREADS, "28", SpecificationKey.TDP, "125"});

            createComponent("AMD Ryzen 7 7800X3D", "7800X3D", "AMD Ryzen 7 7800X3D gaming processor with 3D V-Cache.", 369.00, ComponentType.CPU, amd, cpuCat,
                new Object[]{SpecificationKey.SOCKET, "AM5", SpecificationKey.CORES, "8", SpecificationKey.THREADS, "16", SpecificationKey.TDP, "120"});

            createComponent("Intel Core i5-14600K", "14600K", "Intel Core i5-14600K desktop processor. 14 cores (6 P-cores + 8 E-cores).", 299.99, ComponentType.CPU, intel, cpuCat,
                new Object[]{SpecificationKey.SOCKET, "LGA1700", SpecificationKey.CORES, "14", SpecificationKey.THREADS, "20", SpecificationKey.TDP, "125"});

            // 2. GPUs
            createComponent("ASUS ROG Strix RTX 4080 Super OC", "RTX 4080 Super", "ASUS ROG Strix GeForce RTX 4080 Super 16GB GDDR6X.", 1099.99, ComponentType.GPU, asus, gpuCat,
                new Object[]{SpecificationKey.VRAM, "16GB GDDR6X", SpecificationKey.TDP, "320", SpecificationKey.LENGTH, "357 mm"});

            createComponent("Gigabyte Radeon RX 7800 XT Gaming OC", "RX 7800 XT", "Gigabyte Radeon RX 7800 XT Gaming OC 16GB.", 499.99, ComponentType.GPU, gigabyte, gpuCat,
                new Object[]{SpecificationKey.VRAM, "16GB GDDR6", SpecificationKey.TDP, "263", SpecificationKey.LENGTH, "302 mm"});

            createComponent("MSI Ventus 2X RTX 4060 Ti", "RTX 4060 Ti", "MSI GeForce RTX 4060 Ti Ventus 2X Black 8G OC.", 389.99, ComponentType.GPU, msi, gpuCat,
                new Object[]{SpecificationKey.VRAM, "8GB GDDR6", SpecificationKey.TDP, "160", SpecificationKey.LENGTH, "199 mm"});

            // 3. Motherboards
            createComponent("ASUS ROG Strix Z790-F Gaming WiFi II", "Z790-F WiFi II", "Intel Z790 LGA1700 ATX motherboard.", 359.99, ComponentType.MOTHERBOARD, asus, moboCat,
                new Object[]{SpecificationKey.SOCKET, "LGA1700", SpecificationKey.FORM_FACTOR, "ATX"});

            createComponent("MSI MAG B650 Tomahawk WiFi", "B650 Tomahawk", "AMD B650 AM5 ATX Motherboard.", 199.99, ComponentType.MOTHERBOARD, msi, moboCat,
                new Object[]{SpecificationKey.SOCKET, "AM5", SpecificationKey.FORM_FACTOR, "ATX"});

            // 4. RAM
            createComponent("Corsair Vengeance RGB 32GB (2x16GB) DDR5-5600", "Vengeance RGB 32GB", "Corsair Vengeance RGB 32GB (2x16GB) DDR5-5600 RAM.", 99.99, ComponentType.RAM, corsair, ramCat,
                new Object[]{SpecificationKey.MEMORY_TYPE, "DDR5", SpecificationKey.MEMORY_SPEED, "5600 MHz"});

            // 5. Storage
            createComponent("Samsung 990 Pro 2TB PCIe 4.0 NVMe M.2 SSD", "990 Pro 2TB", "Samsung 990 Pro 2TB NVMe M.2 SSD.", 169.99, ComponentType.SSD, samsung, storageCat,
                new Object[]{SpecificationKey.FORM_FACTOR, "M.2", SpecificationKey.MEMORY_TYPE, "NVMe"});

            // 6. Power Supply
            createComponent("Corsair RM850x 850W Gold", "RM850x", "Corsair RM850x 850 Watt 80 Plus Gold Power Supply.", 129.99, ComponentType.POWER_SUPPLY, corsair, psuCat,
                new Object[]{SpecificationKey.FORM_FACTOR, "ATX", SpecificationKey.TDP, "850"});

            // 7. CPU Cooler
            createComponent("Corsair iCUE H150i 360mm AIO", "H150i", "Corsair iCUE H150i Elite 360mm Liquid CPU Cooler.", 189.99, ComponentType.CPU_COOLER, corsair, coolerCat,
                new Object[]{SpecificationKey.SOCKET, "LGA1700, AM5"});

            // 8. PC Case
            createComponent("Lian Li O11 Dynamic EVO Mid-Tower", "O11 Dynamic", "Lian Li O11 Dynamic EVO Mid-Tower Case.", 149.99, ComponentType.CABINET, corsair, caseCat,
                new Object[]{SpecificationKey.FORM_FACTOR, "ATX"});
        }
    }

    private void createComponent(String name, String model, String desc, double price, ComponentType type, Brand brand, Category category, Object[] specPairs) {
        String sku = "SKU-" + category.getName().substring(0, Math.min(3, category.getName().length())).toUpperCase()
                + "-" + brand.getName().substring(0, Math.min(3, brand.getName().length())).toUpperCase()
                + "-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        com.pcbuilderstore.backend.entity.Component component = com.pcbuilderstore.backend.entity.Component.builder()
                .name(name)
                .model(model)
                .description(desc)
                .price(BigDecimal.valueOf(price))
                .warrantyMonths(36)
                .imageUrl("https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&auto=format&fit=crop&q=80")
                .componentType(type)
                .sku(sku)
                .brand(brand)
                .category(category)
                .active(true)
                .build();

        List<ComponentSpecification> specsList = new ArrayList<>();
        for (int i = 0; i < specPairs.length; i += 2) {
            SpecificationKey key = (SpecificationKey) specPairs[i];
            String val = (String) specPairs[i + 1];
            specsList.add(ComponentSpecification.builder()
                    .component(component)
                    .specificationKey(key)
                    .value(val)
                    .build());
        }
        component.setSpecifications(specsList);

        com.pcbuilderstore.backend.entity.Component savedComponent = componentRepository.save(component);

        Inventory inventory = Inventory.builder()
                .component(savedComponent)
                .availableQuantity(50)
                .reservedQuantity(0)
                .minimumStock(5)
                .maximumStock(200)
                .build();

        savedComponent.setInventory(inventory);
        componentRepository.save(savedComponent);
    }
}
