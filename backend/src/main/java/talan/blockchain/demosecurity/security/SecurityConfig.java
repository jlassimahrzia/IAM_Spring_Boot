package talan.blockchain.demosecurity.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public AuthenticationManagerBuilder authenticationManagerBuilder;

    public SecurityConfig(AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/login","/api/employee/save").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/role/save", "/api/authority/save").hasAuthority("CREATE")
                .requestMatchers(HttpMethod.PUT,"/api/employee/changePassword", "/api/employee/updateProfile","/api/role/update","/api/authority/update"
                        ,"/api/role/assignAuthority","/api/employee/assignRole","/api/employee/rejectRole","/api/role/rejectAuthority").hasAuthority("UPDATE")
                .requestMatchers(HttpMethod.DELETE,"/api/employee/delete/*","/api/role/delete","/api/authority/delete").hasAuthority("DELETE")
                .requestMatchers(HttpMethod.GET,"/api/employee/list","/api/employee/loadUser/*","/api/role/list","/api/authority/list").hasAuthority("READ")
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new AuthenticationFilter(authenticationManagerBuilder))
                .addFilterBefore(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }

    @Bean
    public BCryptPasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
