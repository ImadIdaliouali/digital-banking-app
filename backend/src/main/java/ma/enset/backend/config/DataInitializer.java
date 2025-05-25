package ma.enset.backend.config;

import ma.enset.backend.entities.Role;
import ma.enset.backend.entities.User;
import ma.enset.backend.repositories.RoleRepository;
import ma.enset.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        if (roleRepository.findByName("USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("USER");
            userRole.setDescription("Default user role");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByName("ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);
        }

        // Create default admin user if it doesn't exist
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@bank.com");
            admin.setPassword(passwordEncoder.encode("admin123"));

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(roleRepository.findByName("ADMIN").get());
            adminRoles.add(roleRepository.findByName("USER").get());
            admin.setRoles(adminRoles);

            userRepository.save(admin);
        }

        // Create default user if it doesn't exist
        if (userRepository.findByUsername("user").isEmpty()) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@bank.com");
            user.setPassword(passwordEncoder.encode("user123"));

            Set<Role> userRoles = new HashSet<>();
            userRoles.add(roleRepository.findByName("USER").get());
            user.setRoles(userRoles);

            userRepository.save(user);
        }
    }
}
