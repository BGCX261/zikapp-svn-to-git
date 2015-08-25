/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entities.Track;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Stateless
@Path("track")
public class TrackFacadeREST extends AbstractFacade<Track> {
    @PersistenceContext(unitName = "ZikAppWSPU")
    private EntityManager em;
    
    @Context
    HttpServletRequest ctx;

    public TrackFacadeREST() {
        super(Track.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Track entity) {
        super.create(entity);
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(Track entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Track find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Track> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Track> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
    
    
    
    @POST 
    @Path("upload")
    // public String upload(@Context HttpServletRequest request, @PathParam("myfile") String fileName) throws Exception {
    public String upload(@Context HttpServletRequest request) throws Exception {
        System.out.println("############   dans l'upload du fichier");

        String response = "none";

        if (ServletFileUpload.isMultipartContent(request)) { 

            response="got file in request";

            // Create a factory for disk-based file items 
            DiskFileItemFactory  fileItemFactory = new DiskFileItemFactory();

            // Create a new file upload handler             
            ServletFileUpload uploadHandler = new ServletFileUpload(fileItemFactory);

            try {
                /*
                 * Parse the request
                 */
                List items = uploadHandler.parseRequest(request);
                Iterator itr = items.iterator();
                Track track = new Track();
                while(itr.hasNext()) {
                    
                    FileItem item = (FileItem) itr.next();
                    /*
                     * Handle Form Fields.
                     */
                    if(item.isFormField()) {
                        if(item.getFieldName().equals("title")) {track.setTitle(item.getString());}
                        if(item.getFieldName().equals("album")) {track.setAlbum(item.getString());}
                        if(item.getFieldName().equals("year"))  {track.setYears(item.getString());}
                        if(item.getFieldName().equals("style")) {track.setStyle(item.getString());}
                        if(item.getFieldName().equals("author")){track.setAuthor(item.getString());}
                        response += "<BR>" + "Field Name = "+item.getFieldName()+", Value = "+item.getString();
                    } else {
                        /*
                         * Write file to the ultimate location.
                         */
                        String initialPath = ctx.getServletContext().getRealPath("/");
                        String dirPath = initialPath.replace("\\ZikAppWS\\build\\web\\", "");
                        //String webPath = ctx.getRequestURL().toString().replace("/ZikAppWS/webresources/track/upload", "");
                        dirPath += "/ZikApp/ZikApp-war/web/tracks/";
                        File destinationDir = new File(dirPath);
                        destinationDir.mkdir();
                        System.out.println("############## Rep upload :"+destinationDir.getAbsolutePath());
                        
                        /*InputStream is = item.getInputStream();
                        OutputStream os = new FileOutputStream(file);
                        byte buf[]=new byte[1024];
                        int len;
                        while((len=is.read(buf))>0) {
                            os.write(buf,0,len);
                        }
                        os.close();
                        is.close();*/
                        File file;
                        
                        //System.out.println(file.getAbsolutePath());
                        
                        if(item.getFieldName().equals("track"))
                        {
                            file = new File(destinationDir,track.getSlug()+".mp3");
                            track.setLocalPath(file.getAbsolutePath());
                            track.setWebPath("/ZikApp-war/tracks/"+track.getSlug()+".mp3");
                            item.write(file);
                        }
                        if(item.getFieldName().equals("cover"))
                        {
                            System.err.println("************* type : "+item.getContentType());
                            String type = item.getContentType().replace("image/", ".");
                            item.getContentType();
                            file = new File(destinationDir,track.getSlug()+type);
                            track.setCoverPath(file.getAbsolutePath());
                            item.write(file);
                        }
                        
                        //Handle Uploaded files.
                        response += "<BR>" + "File Field Name = "+item.getFieldName()+
                            ", File Name = "+item.getName()+
                            ", Content type = "+item.getContentType()+
                            ", File Size = "+item.getSize();
                    }
                }
                em.persist(track);
            }catch(FileUploadException ex) {
                response += "Error encountered while parsing the request " + ex;
            } catch(Exception ex) {
                response += "Error encountered while uploading file " + ex;
            }
        } 

        System.out.println(response);
        return response;
    }
    
    
    
    
    
}
