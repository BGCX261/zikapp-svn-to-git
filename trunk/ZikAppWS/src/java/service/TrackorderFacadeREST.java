/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entities.PlayList;
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

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Stateless
@Path("trackorder")
public class TrackorderFacadeREST extends AbstractFacade<TrackOrder> {
    @PersistenceContext(unitName = "ZikAppWSPU")
    private EntityManager em;

    public TrackorderFacadeREST() {
        super(TrackOrder.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(TrackOrder entity) {
        super.create(entity);
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(TrackOrder entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("/{id}/order/{order}")
    @Consumes({"application/xml", "application/json"})
    public void editOrder(@PathParam("id") Long id, @PathParam("order") int order) {
        TrackOrder to = super.find(id);
        to.setTrackOrder(order);
        PlayList p = to.getPlayList();
        
    }
    

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        TrackOrder to = super.find(id);
        PlayList p = to.getPlayList();
        super.remove(to);
        em.refresh(p);
        em.merge(p);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public TrackOrder find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<TrackOrder> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<TrackOrder> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
