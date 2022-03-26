import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.imgcodecs.Imgcodecs;

public class CopyAndPasteAnImage {
   public static void main(String args[]) {

      //Loading the OpenCV core library
      System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
      
      //Reading the Image from the file and storing it in to a Matrix object
      String file = "C:/FFOutput/logo.jpg";
      
      Mat matrix = Imgcodecs.imread(file);
      System.out.println("Image Loaded ..........");
      String file2 = "C:/FFOutput/logoResaved.jpg";

      //Writing the image
      Imgcodecs.imwrite(file2, matrix);
      System.out.println("Image Saved ............");
   }
}