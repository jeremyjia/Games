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
		document.save("C:/pdfBox/BlankPdf.pdf");
		System.out.println("PDF created");

		// Closing the document
		document.close();
	}
}