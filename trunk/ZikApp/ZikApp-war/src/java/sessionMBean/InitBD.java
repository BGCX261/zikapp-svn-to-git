/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sessionMBean;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import sessionBean.TrackManager;

/**
 * Cette Fonction Permet d'initialiser la base de données en injectant des morceaux et Play List de test 
 * <br />au mom du déploiment
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
public class InitBD implements ServletContextListener{
    TrackManager trackManager = lookupTrackManagerBean();

    
    /*
     * Création du jeu de test
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        trackManager.init();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        trackManager.destroyBD();
    }

    private TrackManager lookupTrackManagerBean() {
        try {
            Context c = new InitialContext();
            return (TrackManager) c.lookup("java:global/ZikApp/ZikApp-ejb/TrackManager!sessionBean.TrackManager");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
    
}
