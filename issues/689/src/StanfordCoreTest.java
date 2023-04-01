import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;

public class StanfordCoreTest {

    public static void main(String[] args) {
        String props = "StanfordCoreNLP-chinese.properties";
        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
        Annotation annotation;
        //Data from file
        //annotation = new Annotation(IOUtils.slurpFileNoExceptions(file));
        annotation = new Annotation("Jeremy每天跑步锻炼身体，还喜欢打羽毛球");
        pipeline.annotate(annotation);
        pipeline.prettyPrint(annotation, System.out);

    }

}
