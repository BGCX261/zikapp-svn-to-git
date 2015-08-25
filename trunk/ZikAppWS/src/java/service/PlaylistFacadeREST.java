/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entities.PlayList;
import entities.Track;
import entities.TrackOrder;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Stateless
@Path("playlist")
public class PlaylistFacadeREST extends AbstractFacade<PlayList> {
    @PersistenceContext(unitName = "ZikAppWSPU")
    private EntityManager em;

    public PlaylistFacadeREST() {
        super(PlayList.class);
    }

    @POST
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED, "application/json","application/xml"})
    public String create(MultivaluedMap<String, String> inFormParams) {
        System.out.println("############## saving play List !");
        PlayList p = new PlayList(inFormParams.getFirst("inputplaylistname"));
        
        List<String> input = inFormParams.get("inputtrackid");
        if(input != null)
        {
            for (String str : input) {
                Track t = em.find(Track.class, Long.parseLong(str));
                TrackOrder to = new TrackOrder();
                t.addTrackOrder(to);
                p.addTrack(to);
                em.persist(t);
                em.persist(to);
            }
        }
        super.create(p);
        return "/ZikAppWS/webresources/playlist/"+p.getId();
    }
    
    
    @PUT
    @Path("/sort")
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED, "application/json","application/xml"})
    public String sort(MultivaluedMap<String, String> inFormParams) {
        System.out.println("############## sorting play List !");
        
        List<String> input = inFormParams.get("track");
        int i=0;
        if(input != null)
        {
            for (String str : input) {
                i++;
                TrackOrder to = em.find(TrackOrder.class, Long.parseLong(str));
                System.out.println("############ sorting : "+to.getTrack().getSlug());
                to.setTrackOrder(i);
                em.merge(to);
            }
        }
        return "La Play List a été correctement triée !";
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(PlayList entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("/{id}/addtrack/{trackid}")
    public String edit(@PathParam("id") Long id, @PathParam("trackid") Long idtrack) {
        PlayList p = super.find(id);
        Track t = em.find(Track.class, idtrack);
        TrackOrder to = new TrackOrder();
        t.addTrackOrder(to);
        p.addTrack(to);
        em.persist(to);
        return "morceau ajouté";
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }
    
    @DELETE
    @Path("{id}/remove/{idtrack}")
    public void removeTrack(@PathParam("id") Long id, @PathParam("idtrack") Long idTrack) {
        //super.remove(super.find(id));
        PlayList p = super.find(id);
        TrackOrder to = em.find(TrackOrder.class, idTrack);
        if(to != null && p!= null)
        {
            em.remove(to);
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public PlayList find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<PlayList> findAll() {
        List<PlayList> ps = super.findAll();
        for (PlayList p : ps) {
            for(TrackOrder to :p.getTracks())
            {
                to.setPlayList(null);
            }
        }
        return ps;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<PlayList> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
