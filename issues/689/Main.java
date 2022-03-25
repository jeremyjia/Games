import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main extends JPanel {
   public void paint(Graphics g) {
      Graphics2D g2 = (Graphics2D) g;
      g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
      g2.setFont(new Font("Serif", Font.PLAIN, 48));
      paintHorizontallyCenteredText(g2, "Java Source", 200, 75);
      paintHorizontallyCenteredText(g2, "and", 200, 125);
      paintHorizontallyCenteredText(g2, "Support", 200, 175);
   }
   protected void paintHorizontallyCenteredText(
      Graphics2D g2, String s, float centerX, float baselineY) {
      
      FontRenderContext frc = g2.getFontRenderContext();
      Rectangle2D bounds = g2.getFont().getStringBounds(s, frc);
      float width = (float) bounds.getWidth();
      g2.drawString(s, centerX - width / 2, baselineY);
   }
   public static void main(String[] args) {
      JFrame f = new JFrame();
      f.getContentPane().add(new Main());
      f.setSize(450, 350);
      f.setVisible(true);
   }
}