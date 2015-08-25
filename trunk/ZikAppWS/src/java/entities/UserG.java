/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@Entity
public class UserG implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String userName;
    private String password;
    private String name;
    private String email;
    private String address;
    private String avatar;
    private String sessionKey;
    @OneToMany
    private List<UserG> friends = new ArrayList<UserG>();
    
    @OneToMany
    private List<PlayList> sharedLists = new ArrayList<PlayList>();
    
    @OneToMany(mappedBy = "user")
    private List<PlayList> playLists = new ArrayList<PlayList>();
    
    @OneToMany(mappedBy = "user")
    private List<Track> tracks = new ArrayList<Track>();
    
    
    
    // Construct

    public UserG() {
    }

    public UserG(String userName, String password, String name, String email, String address) {
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.email = email;
        this.address = address;
    }
    
    
    
    
    
    // Getter and Setter 
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<UserG> getFriends() {
        return friends;
    }

    public void setFriends(List<UserG> friends) {
        this.friends = friends;
    }
    
    public void addFriend(UserG user)
    {
        this.friends.add(user);
    }

    public List<PlayList> getSharedLists() {
        return sharedLists;
    }

    public void setSharedLists(List<PlayList> sharedLists) {
        this.sharedLists = sharedLists;
    }
    
    public void addSharedPlayList(PlayList p)
    {
        this.sharedLists.add(p);
    }

    public List<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(List<PlayList> playLists) {
        this.playLists = playLists;
    }
    
    public void addPlayList(PlayList p)
    {
        this.playLists.add(p);
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }
    
    public void addTrack(Track track)
    {
        this.tracks.add(track);
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
        if (!(object instanceof UserG)) {
            return false;
        }
        UserG other = (UserG) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.User[ id=" + id + " ]";
    }
    
}
