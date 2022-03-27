import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;

public class CreatingEmptyPdf {
	public static void main(String args[]) throws IOException, Exception {

		// Creating PDF document object
		PDDocument document = new PDDocument();

		// Add an empty page to it
		document.addPage(new PDPage());

		// Saving the document
		File file = new File("C:/pdfBox/BlankPdf.pdf");
		File fileParent = file.getParentFile();
		if(!fileParent.exists()) {
			fileParent.mkdirs();
		}	
		document.save(file.getAbsolutePath());
		System.out.println("PDF created");

		// Closing the document
		document.close();
	}
}