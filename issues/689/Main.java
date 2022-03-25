import java.awt.Shape;
import java.awt.geom.*;

public class Main {
   public static void main(String[] args) {
      int x1 = 1, x2 = 2, w = 3, h = 4, 
      x = 5, y = 6, 
	   y1 = 1, y2 = 2, start = 3;
      
      Shape line = new Line2D.Float(x1, y1, x2, y2);
      Shape arc = new Arc2D.Float(x, y, w, h, start, 1, 1);
      Shape oval = new Ellipse2D.Float(x, y, w, h);
      Shape rectangle = new Rectangle2D.Float(x, y, w, h);
      Shape roundRectangle = new RoundRectangle2D.Float (x, y, w, h, 1, 2);
      System.out.println("Different shapes are created:");
   }
}