/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Entity
@XmlRootElement
public class Trackorder implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int trackOrder;
    @ManyToOne
    private Track track;
    @ManyToOne
    private Playlist playList;

    public Trackorder() {
    }

    public Trackorder(int trackOrder, Track track) {
        this.trackOrder = trackOrder;
        this.track = track;
    }
    
    
    
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTrackOrder() {
        return trackOrder;
    }

    public void setTrackOrder(int trackOrder) {
        this.trackOrder = trackOrder;
    }
    
    public Track getTrack()
    {
        return this.track;
    }
    
    public void setTrack(Track track)
    {
        this.track = track;
        //track.addTrackOrder(this);
    }
    
    public void setPlayList(Playlist pl)
    {
        this.playList = pl;
    }
    
    public Playlist getPlayList()
    {
        return this.playList;
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
        if (!(object instanceof Trackorder)) {
            return false;
        }
        Trackorder other = (Trackorder) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PlayListOrder[ id=" + id + " ]";
    }
    
}
