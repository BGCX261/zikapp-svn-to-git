/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */
public class Util {
    
    /**
     * supprime tous les espaces de la chaine
     * remplace les caractères spéciaux par des "_"
     * @param name
     * @return 
     */
    public static String slugify(String name)
    {
        String slug;
        slug = name.trim();
        slug = slug.toLowerCase();
        slug = slug.replace(" ", "_");
        slug = slug.replaceAll("[\\[]wàâäÄÀÂéèêëÈÊËìîïÌÏÎòöôÒÖÔùüûÙÜÛç!#$€%&'`(),;:/@...]","_");
        return slug;
    }
    
    
    
}
