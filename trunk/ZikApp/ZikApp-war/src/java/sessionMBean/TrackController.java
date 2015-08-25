/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sessionMBean;

import com.mpatric.mp3agic.ID3v1;
import com.mpatric.mp3agic.InvalidDataException;
import com.mpatric.mp3agic.Mp3File;
import com.mpatric.mp3agic.UnsupportedTagException;
import entities.PlayList;
import entities.Track;
import entities.TrackOrder;
import entities.UserG;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.event.ComponentSystemEvent;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.event.RowEditEvent;
import org.primefaces.model.UploadedFile;
import sessionBean.TrackManager;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Named(value = "trackController")
@SessionScoped
public class TrackController implements Serializable {

  @EJB
    private TrackManager trackManager;
    
    private UserG user = new UserG();
    private UploadedFile file;
    private List<File> files;
    private List<Track> tracks ;
    private Track track;
    private Long id;
    private String txt1;
    private boolean connected = false;
    private List<PlayList> playLists ;
    private List<UserG> amis = new ArrayList<UserG>();

    public TrackController() {
        
    }

    
    
    //**************************** Getter and Setter ***************************
    public UserG getUser() {
        return user;
    }

    public void setUser(UserG user) {
        this.user = user;
    }
    
    public UploadedFile getFile() {
        return file;
    }

    public void setFile(UploadedFile file) {
        System.out.print("fichier recupéré : "+file.getFileName());
        this.file = file;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public List<Track> getTracks() {
        if(tracks == null)
        {
            tracks = trackManager.getTracks();
        }
        return tracks;
    }
    
    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }
    
    
    public void setPlayLists(List<PlayList> playLists)
    {
        this.playLists = playLists;
    }
    
    
    public List<PlayList> getPlayLists()
    {
        if(playLists == null) {
            this.playLists = trackManager.getPlayLists();
        }
        return this.playLists;
    }
    
    public List<TrackOrder> getPlayListTracks(PlayList p)
    {
        return trackManager.getPlayListTracks(p);
    }

    public String getTxt1() {
        return txt1;
    }

    public void setTxt1(String txt1) {
        this.txt1 = txt1;
    }
    
    public TrackManager getTrackManager() {
        return trackManager;
    }

    public void setTrackManager(TrackManager trackManager) {
        this.trackManager = trackManager;
    }

    public List<UserG> getAmis() {
        return amis;
    }

    public void setAmis(List<UserG> amis) {
        this.amis = amis;
    }
    
    //**************************************************************************

    
    
    
    
    
    
    
    
    
    
    
    public void securityCheck()
    {
        if(this.user == null)
        {
            this.user = new UserG();
        }
        if(!this.connected)
        {
            
            try {
                FacesContext.getCurrentInstance().getExternalContext().redirect("index.xhtml");
            } catch (IOException ex) {
                Logger.getLogger(TrackController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
    
    public String auth()
    {
        this.user = trackManager.getUser(this.user.getUserName(), this.user.getPassword());
        
        if(this.user != null)
        {
            this.connected = true;
            System.out.println("############# User authentifié : "+this.user.getUserName());
            return "trackList?faces-redirect=true";
        }
        else
        {
            this.user = new UserG();
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,"Error", "Erreur d'authentification verifiez votre nom d'utilisateur et mot de passe !"));
            System.out.println("########### aucun User trouvé");
            return "index";
        }
        
    }
    
    public String createUser()
    {
        trackManager.persist(this.user);
        saveImage(this.file);
        this.connected = true;
        
        
        
        return "newTracks.xhtml?faces-redirect=true";
    }
    
    public void deleteTrack(Track track)
    {
        System.out.println("********************** deleting track : ");
        if(track.getLocalPath() != null)
        {
            File f = new File(track.getLocalPath());
            if(f.exists())
            {
                f.delete();
            }
        }
        
        
        for(TrackOrder to :track.getTrackOrders())
        {
            trackManager.remove(to);
        }
        
        trackManager.remove(track);
        
        FacesMessage msg = new FacesMessage("Succesful", track.getTitle() + " a été supprimé !");
        FacesContext.getCurrentInstance().addMessage(null, msg);
        tracks = trackManager.getTracks();
        
        
    }
    
    public String deleteTrackOrder(TrackOrder to)
    {
        System.out.println("######################## dans le delete track order");
        trackManager.remove(to);
        return "playList?faces-redirect=true";
    }
    
    
    
    
    
    public String showTrack(Long id)
    {
        //this.track = trackManager.getTrack(id);
        return "trackEdit?id="+id+"faces-redirect=true&amp;includeViewParams=true";
    }
    
    public void loadTrack(ComponentSystemEvent event)
    {
        this.id = Long.parseLong(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("id"));
        
        this.track = trackManager.getTrack(this.id);
        System.err.println("############# track :"+this.track.getTitle());
    }
    
    public void preRenderView() {
        // Hack pour éviter l'erreur Cannot create a session after the response 
        // has been committed des datatables PrimeFaces

        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
    }
    
    public String updateTrack()
    {
        System.err.println("### update :"+this.track.getTitle());
        this.track = (Track)trackManager.update(this.track);
        
        FacesMessage msg = new FacesMessage("Succesful", track.getTitle() + " a été mis à jour !");
        FacesContext.getCurrentInstance().addMessage(null, msg);
        
        return "trackList?faces-redirect=true";
    }
    
    
    
    
    public void handleFileUpload(FileUploadEvent event) {  
       System.out.print("####### Dans le file handler #######"); 
       
       if(event == null)
       {
           System.err.print("##### event est null ########");
           return;
       }
       
       
        try {
            UploadedFile upf = event.getFile();
       
            Track song = new Track(upf.getFileName());
            song.setLocalPath(getTrackLocalDir(song.getSlug()));
            song.setWebPath(getTrackWebDir(song.getSlug()));
            
            InputStream inputStream= upf.getInputstream();
            File f = new File(getTrackLocalDir(song.getSlug()));
            OutputStream out= new FileOutputStream(f);
            byte buf[]=new byte[1024];
            int len;
            while((len=inputStream.read(buf))>0) {
                out.write(buf,0,len);
            }
            out.close();
            inputStream.close();
            
            //trouve les tags mp3 dans le morceau et rempli l'objet "track
            extractTags(f, song);
            // sauvegarde du morceau
            trackManager.persist(song);
            
       } catch (Exception e) {
            System.err.println("Erreur lors de creation du morceau");
            e.printStackTrace();
       }
        
        
        FacesMessage msg = new FacesMessage("Succesful", event.getFile().getFileName() + " a été uploadé !");
        
        FacesContext.getCurrentInstance().addMessage(null, msg);  
    }  
    
    
    /**
     * Cette fonction permet de extraire les tags d'un fichier mp3 
     * s'ils existent
     * @param f
     * @param t 
     */
    public void extractTags(File f,Track t)
    {
        try {
            Mp3File mp3 = new Mp3File(f.getAbsolutePath());
            if (mp3.hasId3v1Tag()) {
        	ID3v1 id3v1Tag = mp3.getId3v1Tag();
                t.setAlbum(id3v1Tag.getAlbum());
                t.setAuthor(id3v1Tag.getArtist());
                t.setStyle(id3v1Tag.getGenreDescription());
                t.setYears(id3v1Tag.getYear());
        	System.out.println("Track: " + id3v1Tag.getTrack());
        	System.out.println("Artist: " + id3v1Tag.getArtist());
        	System.out.println("Title: " + id3v1Tag.getTitle());
        	System.out.println("Album: " + id3v1Tag.getAlbum());
        	System.out.println("Year: " + id3v1Tag.getYear());
        	System.out.println("Genre: " + id3v1Tag.getGenre() + " (" + id3v1Tag.getGenreDescription() + ")");
        	System.out.println("Comment: " + id3v1Tag.getComment());
                
        }
        } catch (IOException ex) {
            Logger.getLogger(TrackController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedTagException ex) {
            Logger.getLogger(TrackController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvalidDataException ex) {
            Logger.getLogger(TrackController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public String getPagesList()
    {
        return "5,10,15,20";
    }
    
    public void onEdit(RowEditEvent event) {  
        FacesMessage msg = new FacesMessage("Morceau modifier", ((Track) event.getObject()).getTitle());  
  
        FacesContext.getCurrentInstance().addMessage(null, msg);  
    }  
      
    public void onCancel(RowEditEvent event) {  
        FacesMessage msg = new FacesMessage("Operation annulée", ((Track) event.getObject()).getTitle());  
  
        FacesContext.getCurrentInstance().addMessage(null, msg);  
    } 
    
    
    public static String getTrackLocalDir(String name)
    {
        System.out.println("###### calcul local dir ....");
        String spath = FacesContext.getCurrentInstance().getExternalContext().getRealPath("/");
        String goodspath = spath.replace("\\dist\\gfdeploy\\ZikApp\\ZikApp-war_war\\", "");
        String path = goodspath+"/ZikApp-war/web/tracks/"+name;

        // creation du repertoire "zik" s'il n'existe pas 
        File testDir = new File(goodspath+"/ZikApp-war/web/tracks/");
        testDir.mkdirs();
        // ------------------------------------------------

        System.out.printf("local path : "+path);
        return path;
    }
    
    
    
    public static String getTrackWebDir(String name)
    {
        System.out.println("######  calcul web dir .....");
        StringBuffer webUrl = ((HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest()).getRequestURL();
        String webPath = webUrl.toString().substring(0, webUrl.toString().lastIndexOf("ZikApp-war/")+11)+"tracks/"+name;
        System.out.print("web path :"+webPath);
        //return webPath;
        return "/ZikApp-war/tracks/"+name;
    }
    
    
    
    public String test()
    {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Welcome !"));
        System.out.println("######## test ajax");
        return "test";
    }
    
    
    public List<String> complete(String query) {
        List<String> results = new ArrayList<String>();

        String like = "%" + query.toLowerCase() + "%";
        List<Track> foundedTracks = trackManager.getTracksLike(like);
        for (Track t : foundedTracks) {
            results.add("track: "+t.getTitle() + ":" + t.getId());
        }
        for (PlayList p : trackManager.getPlaylistsLike(like)) {
            results.add("Plist: "+p.getName() + ":" + p.getId());
        }
        for (UserG f : trackManager.getFriendsLike(like)) {
            results.add("Friend: "+f.getUserName() + ":" + f.getId());
        }


        return results;
    }
    
    public void showFilterCompte() {
        int indSeparator = this.txt1.lastIndexOf(":");
        int typeSeparator = this.txt1.indexOf(":");
        Long searchId;
        String searchType;
        try {
            //HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
            searchId = Long.parseLong(this.txt1.substring(indSeparator + 1, this.txt1.length()));
            searchType = this.txt1.substring(0, typeSeparator);
            System.out.println("------------ type : "+searchType);
            FacesContext ctx = FacesContext.getCurrentInstance();
            ExternalContext extContext = ctx.getExternalContext();
            String url="";
            if(searchType.equals("Track")){url = "/EMall/product.xhtml?id=" + searchId;}
            if(searchType.equals("Plist")){url = "/EMall/store.xhtml?id="  + searchId;}
            if(searchType.equals("Friend")){url = "/EMall/store.xhtml?id="  + searchId;}
            this.txt1 ="";
            FacesContext.getCurrentInstance().getExternalContext().redirect(url);
        } catch (Exception e) {
            System.out.println("erreur lors du formatage !!!  : " + this.txt1.substring(indSeparator + 1, this.txt1.length()));
        }
        System.err.println("---------------- no redirect !!");
    }
    
    
    
    
    public String logOut()
    {
        this.user = null;
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
        session.invalidate();
        return "index?faces-redirect=true";
    }
    
    
    
    
    public String getUserLocalDir()
    {
        String spath = FacesContext.getCurrentInstance().getExternalContext().getRealPath("/");
        System.err.println("context : "+spath);
       
        String userPath =spath+"/tracks/"+this.user.getUserName();
        

        // creation du repertoire de l'utilisateur s'il n'existe pas 
        File testDir = new File(userPath);
        testDir.mkdir();
        // ------------------------------------------------

        System.out.printf("############ local user path : "+userPath);
        return userPath;
    }
    
    public void saveImage(UploadedFile image)
    {
        InputStream is = null;
        
        Date today = new Date();
        SimpleDateFormat formater = new SimpleDateFormat("ddMMyyHHmmss");
        String imgName;
        System.out.println("############# content type : "+image.getContentType());
        String ext;
        ext= image.getContentType().replace("image/", ".");
        
        String localDir = getUserLocalDir()+"/img";
        File f = new File(localDir);
        f.mkdir();
        
        imgName = this.user.getUserName()+formater.format(today)+ext;
        
        f = new File(localDir+"/"+imgName);
        
        try {
            is = image.getInputstream();
            OutputStream out= new FileOutputStream(f);
            byte buf[]=new byte[1024];
            int len;
            while((len=is.read(buf))>0) {
                out.write(buf,0,len);
            }
            out.close();
            is.close();
            
            this.user.setAvatar("tracks/"+this.user.getUserName()+"/img/"+imgName);
            
        } catch (IOException ex) {
            Logger.getLogger(TrackController.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }
    
    
    
}
