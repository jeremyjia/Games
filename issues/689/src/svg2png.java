import java.io.FileOutputStream;
import java.io.OutputStream;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;

public class svg2png {
	public static void main(String[] args) throws Exception {
		
		String svgFileName = "s1";
		if(args.length>0) {
			svgFileName = args[0];		
		}
		System.out.println(svgFileName);
		// Step -1: We read the input SVG document into Transcoder Input
		// We use Java NIO for this purpose
		String path = svg2png.class.getClassLoader().getResource(svgFileName+".svg").toURI().toString();
		System.out.println(path);
		TranscoderInput input_svg_image = new TranscoderInput(path);
		// Step-2: Define OutputStream to PNG Image and attach to TranscoderOutput
		OutputStream png_ostream = new FileOutputStream(svgFileName+".png");
		TranscoderOutput output_png_image = new TranscoderOutput(png_ostream);
		// Step-3: Create PNGTranscoder and define hints if required
		PNGTranscoder my_converter = new PNGTranscoder();
		// Step-4: Convert and Write output
		my_converter.transcode(input_svg_image, output_png_image);
		// Step 5- close / flush Output Stream
		png_ostream.flush();
		png_ostream.close();
		System.out.println("The "+svgFileName+".png created!");
	}
}