import java.awt.Color;
import java.awt.Dimension;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class Panel { 
   public static void main(String[] args) { 
      SwingUtilities.invokeLater(new Runnable() { 
         public void run() { 
            displayJFrame();
         } 
      }); 
   } 
   static void displayJFrame() { 
      JFrame frame = new JFrame("Tutorialspoint");
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setBackground(Color.red);
      frame.setPreferredSize(new Dimension(400, 300));
      frame.pack();
      frame.setLocationRelativeTo(null);
      frame.setVisible(true);
   }
}