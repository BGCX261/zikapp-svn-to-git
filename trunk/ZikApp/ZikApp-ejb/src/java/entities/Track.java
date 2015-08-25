/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;
import util.Util;

/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Entity
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Track.findAll", query = "SELECT t FROM Track t"),
    @NamedQuery(name = "Track.findById", query = "SELECT t FROM Track t WHERE t.id = :id"),
    @NamedQuery(name = "Track.findByAlbum", query = "SELECT t FROM Track t WHERE t.album = :album"),
    @NamedQuery(name = "Track.findByAuthor", query = "SELECT t FROM Track t WHERE t.author = :author"),
    @NamedQuery(name = "Track.findByDuration", query = "SELECT t FROM Track t WHERE t.years = :years"),
    @NamedQuery(name = "Track.findByLocalpath", query = "SELECT t FROM Track t WHERE t.localPath = :localPath"),
    @NamedQuery(name = "Track.findBySlug", query = "SELECT t FROM Track t WHERE t.slug = :slug"),
    @NamedQuery(name = "Track.findByStyle", query = "SELECT t FROM Track t WHERE t.style = :style"),
    @NamedQuery(name = "Track.findByTitle", query = "SELECT t FROM Track t WHERE t.title = :title")})
public class Track implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String author;
    private String album;
    private String years;
    private String style;
    private String coverPath;
    private String localPath;
    private String webPath;
    @OneToMany(mappedBy = "track")
    private List<TrackOrder> trackOrders = new ArrayList<TrackOrder>();
    /**
     * Permet d'avoir un titre sans espace ni caractère specieaux 
     * pour la création du dossier et le chemin localPath unique
     */
    private String slug;
    @ManyToOne
    private UserG user;
    
    
    // constructors

    public Track() {
    }

    public Track(String title) {
        this.title = title;
        this.slug = Util.slugify(title);
    }

    
    
    public Track(String author, String title, String album, String year, String style) {
        this.author = author;
        this.title = title;
        this.years = year;
        this.style = style;
        this.album = album;
        this.slug = Util.slugify(title);
    }
    
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.slug = slugify(this.title);
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getYears() {
        return years;
    }

    public void setYears(String year) {
        this.years = year;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getLocalPath() {
        return localPath;
    }

    public void setLocalPath(String localPath) {
        this.localPath = localPath;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getCoverPath() {
        return coverPath;
    }

    public void setCoverPath(String coverPath) {
        this.coverPath = coverPath;
    }

    public String getWebPath() {
        return webPath;
    }

    public void setWebPath(String webPath) {
        this.webPath = webPath;
    }
    
    public List<TrackOrder> getTrackOrders()
    {
        return this.trackOrders;
    }
    
    public void setTrackOders(List<TrackOrder> tos)
    {
        this.trackOrders = tos;
    }
    
    public void addTrackOrder(TrackOrder to)
    {
        this.trackOrders.add(to);
        to.setTrack(this);
    }
    
    
    
    
    public boolean createFile(File f)
    {
        Date d = new Date();
        this.setLocalPath("./resources/zik/"+slug+d.toString()+"/"+f.getName());
        
        return f.renameTo(new File(this.getLocalPath()));
    }
    
    public String slugify(String s){
        String slugs;
        slugs = util.Util.slugify(s);
        
        return slugs;
    }
    
    
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Track)) {
            return false;
        }
        Track other = (Track) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Track[ id=" + id + " ]";
    }
    
}
