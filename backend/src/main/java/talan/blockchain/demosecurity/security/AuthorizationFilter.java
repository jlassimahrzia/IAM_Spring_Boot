package talan.blockchain.demosecurity.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class AuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers",
                "Origin, Accept, X-Requested-With, Content-Type, "
                        + "Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
        response.addHeader("Access-Control-Expose-Headers",
                "Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization");
        response.addHeader("Access-Control-Allow-Methods","*");

        if(request.getMethod().equals("OPTIONS")){
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else {
            //recuperer le token à partir de la requête envoyée
            String jwt = JWTUtils.extractJWT(request);
            // Si le token n'existe pas la requete, et si la requete est protegée alors bloquer l'accès au ressources.
            // Sinon authoriser l'accès à la ressource demandée
            if(jwt == null) {
                filterChain.doFilter(request, response);
                return;
            }
            /*
            Si le token existe alors on va extraire des information
             */
            try {
                //analyser le token
                // est qu'il est expirer, modifier, ....
                Claims claims= JWTUtils.parseJWT(jwt);
                // extraire les autorities de l'employee
                Collection<GrantedAuthority> authorities= JWTUtils.extractGrantedAuthorities(claims);

                //extraire le username de l'employee
                String username = JWTUtils.extractUsernameFromClaims(claims);

                //preparer l'employee authentifié pour lui donner au contexte de security
                UsernamePasswordAuthenticationToken utilisateurAuthentifier = new UsernamePasswordAuthenticationToken(username, null,authorities);
                // Passer cet employee au contexte de spring security pour analyser
                // si la ressource demander et les autorities de l'emplyee se coorespondent
                SecurityContextHolder.getContext().setAuthentication(utilisateurAuthentifier);
                filterChain.doFilter(request, response);
            }catch (Exception e) {
                filterChain.doFilter(request, response);
            }
        }
    }
}
