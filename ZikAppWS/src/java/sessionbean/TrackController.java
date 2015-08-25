/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sessionbean;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.UploadedFile;

/**
 *
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
@ManagedBean
@RequestScoped
public class TrackController {

    private File file;
    private List<File> files;
    
    
    public TrackController() {
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }
    
    
    
    
   public void handleFileUpload(FileUploadEvent event) {  
       System.out.print("####### Dans le file handler #######"); 
       if(event == null)
       {
           System.out.print("##### event est null ########");
           return;
       }
       UploadedFile upf = event.getFile();
        try {
            File f = new File("/resources/zik/"+upf.getFileName());
            //f.mkdirs();
            
            System.out.print("fichier créé : "+f.getAbsolutePath());
            InputStream inputStream= upf.getInputstream();
            OutputStream out=new FileOutputStream(f);
            byte buf[]=new byte[1024];
            int len;
            while((len=inputStream.read(buf))>0) {
                out.write(buf,0,len);
            }
            out.close();
            inputStream.close();
       } catch (Exception e) {
           e.printStackTrace();
       }
        
        
        FacesMessage msg = new FacesMessage("Succesful", event.getFile().getFileName() + " is uploaded.");
        
        FacesContext.getCurrentInstance().addMessage(null, msg);  
    }  
}
