/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sessionBean;

import entities.PlayList;
import entities.Track;
import entities.TrackOrder;
import entities.UserG;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Stateless
@LocalBean
public class TrackManager {
    @PersistenceContext(unitName = "ZikApp-ejbPU")
    private EntityManager em;
    
    
    
    public void init()
    {
        UserG u1 = new UserG("user1", "user1", "User1", "user1@zikapp.com", "Sophia antipolis");
        UserG u2 = new UserG("user2", "user2", "User2", "user2@zikapp.com", "Sophia antipolis");
        UserG u3 = new UserG("user3", "user3", "User3", "user3@zikapp.com", "Sophia antipolis");
        
        u1.addFriend(u2);
        u1.addFriend(u3);
        
        u2.addFriend(u3);
        u2.addFriend(u1);
        
        u3.addFriend(u1);
        u3.addFriend(u2);
        
        
        PlayList pl = new PlayList("Adèle");
        PlayList pl1 = new PlayList("Adèle min");
        PlayList pl2 = new PlayList("Adèle 2");
        
        Track tr;
        TrackOrder tro;
        
        
        tr  = new Track("Adèle","101 - Daydreamer.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/101_-_daydreamer.mp3");
        tr.setWebPath("/ZikApp-war/tracks/101_-_daydreamer.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl1.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tro);
        em.persist(tr);
        
        
        
        tr  = new Track("Adèle","103 - chasing_pavements.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/103_-_chasing_pavements.mp3");
        tr.setWebPath("/ZikApp-war/tracks/103_-_chasing_pavements.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl1.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","104_-_cold_shoulder.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/104_-_cold_shoulder.mp3");
        tr.setWebPath("/ZikApp-war/tracks/104_-_cold_shoulder.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl1.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","105_-_crazy_for_you.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/105_-_crazy_for_you.mp3");
        tr.setWebPath("/ZikApp-war/tracks/105_-_crazy_for_you.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl1.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","106________________________________-_melt_my_heart_to_stone.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/106_-_melt_my_heart_to_stone.mp3");
        tr.setWebPath("/ZikApp-war/tracks/106_-_melt_my_heart_to_stone.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl1.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","107_-_first_love.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/107_-_first_love.mp3");
        tr.setWebPath("/ZikApp-war/tracks/107_-_first_love.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl2.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","108_-_right_as_rain.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/108_-_right_as_rain.mp3");
        tr.setWebPath("/ZikApp-war/tracks/108_-_right_as_rain.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl2.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","109_-_make_you_feel_my_love.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/109_-_make_you_feel_my_love.mp3");
        tr.setWebPath("/ZikApp-war/tracks/109_-_make_you_feel_my_love.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl2.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        tr  = new Track("Adèle","110_-_my_same.mp3","19-Deluxe-Edition","2008","rock");
        tr.setLocalPath("D:/HALLILI/NetBeansProjects/ZikApp/ZikApp-war/web/tracks/110_-_my_same.mp3");
        tr.setWebPath("/ZikApp-war/tracks/110_-_my_same.mp3");
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl2.addTrack(tro);
        em.persist(tro);
        
        tro = new TrackOrder();
        tr.addTrackOrder(tro);
        pl.addTrack(tro);
        em.persist(tr);
        em.persist(tro);
        
        u1.addPlayList(pl);
        u1.addPlayList(pl1);
        u1.addPlayList(pl2);
        
        u2.addPlayList(pl);
        
        u3.addPlayList(pl2);
        
        em.persist(pl);
        em.persist(pl1);
        em.persist(pl2);
        
        em.persist(u1);
        em.persist(u2);
        em.persist(u3);
        
        
    }
    
    public void destroyBD()
    {
        System.err.println("################ Destruction de base de données");
        //em.createNativeQuery("Drop database ZIKDB").executeUpdate();
        //em.createNativeQuery("SET foreign_key_checks = 0; ").executeUpdate();
        /*Query q = em.createNativeQuery("SELECT tablename FROM SYS.SYSTABLES where tabletype = 'T'");
        
        List<String> tables = q.getResultList();
        List<String> ts = new ArrayList<String>();
        
        
            for(String table :tables)
            {
                try{
                    System.out.println("########## deleting table : ZIKDB."+table);
                    em.createNativeQuery("DROP TABLE ZIKDB."+table).executeUpdate();
                }
                catch(Exception e)
                {
                    System.out.println("###### cannot delete : "+table);
                    ts.add(table);
                }
            }
            Collections.shuffle(ts);
            for(String table :ts)
            {
                    try{
                        System.out.println("########## deleting table : ZIKDB."+table);
                        em.createNativeQuery("DROP TABLE ZIKDB."+table).executeUpdate();
                        //ts.remove(ts.indexOf(table));
                    }
                    catch(Exception e)
                    {
                        System.out.println("###### cannot delete : "+table);
                        //ts.add(table);
                    }
                    
            }
            System.out.println("############# remaining tables : "+ts.size());*/
    }
    
    public List<Track> getTracks()
    {
        return em.createNamedQuery("Track.findAll").getResultList();
    }

    public void persist(Object object) {
        em.persist(object);
    }
    
    public Object update(Object object)
    {
        return em.merge(object);
    }
    
    public void remove(Object object)
    {
        em.remove(em.merge(object));
    }
    
    public Track getTrack(Long id)
    {
        System.err.println("############# id de changement trouvé : "+id);
        return em.find(Track.class, id);
    }
    
    public List<PlayList> getPlayLists()
    {
        //em.refresh(PlayList.class);
        return em.createNamedQuery("PlayList.findAll").getResultList();
    }

    public EntityManager getEm() {
        return em;
    }
    
    public List<TrackOrder> getPlayListTracks(PlayList p)
    {
        Query q = em.createQuery("SELECT tracks from TrackOrder tracks WHERE tracks.playList = :playList order by tracks.trackOrder");
        q.setParameter("playList", p);
        
        return q.getResultList();
    }
    
    public UserG getUser(String username, String mdp)
    {
        try
        {
            Query q = em.createQuery("select u from UserG u where u.userName = :username and u.password = :mdp");
            q.setParameter("username", username);
            q.setParameter("mdp", mdp);

            return (UserG)q.getSingleResult();
        }
        catch(Exception e)
        {
            System.err.println("########### aucun user trouvé");
            return null;
        }
        
    }
    
    public UserG getUserBySessionKey(String key)
    {
        try
        {
            Query q = em.createQuery("select u from User u where u.sessionKey = :key");
            q.setParameter("key", key);

            return (UserG)q.getSingleResult();
        }
        catch(Exception e)
        {
            return null;
        }
    }

    public List<Track> getTracksLike(String like) {
        Query q = em.createQuery("SELECT tracks FROM Track tracks WHERE lower(tracks.title) LIKE :like");
        q.setParameter("like", like);
        q.setMaxResults(200);
        
        return q.getResultList();
    }

    public List<PlayList> getPlaylistsLike(String like) {
        Query q = em.createQuery("SELECT p FROM PlayList p WHERE lower(p.name) LIKE :like");
        q.setParameter("like", like);
        q.setMaxResults(200);
        
        return q.getResultList();
    }

    public List<UserG> getFriendsLike(String like) {
        Query q = em.createQuery("SELECT u FROM UserG u WHERE lower(u.userName) LIKE :like");
        q.setParameter("like", like);
        q.setMaxResults(200);
        
        return q.getResultList();
    }
    

}
