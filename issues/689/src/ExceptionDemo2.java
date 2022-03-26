public class ExceptionDemo2 {
   public static void main(String[] argv) {
      new ExceptionDemo2().doTheWork();
   }
   public void doTheWork() {
      Object o = null; 
      for (int i = 0; i < 5; i++) {
         try {
            o = makeObj(i);
         } catch (IllegalArgumentException e) {
            System.err.println("Error: ("+ e.getMessage()+").");
            return;   
         } finally {
            System.err.println("All done");
            if (o == null)
            System.exit(0);
         }
         System.out.println(o); 
      }
   }
   public Object makeObj(int type) throws IllegalArgumentException {
      if (type == 1)throw new IllegalArgumentException("Don't like type " + type);
      return new Object();
   }
}