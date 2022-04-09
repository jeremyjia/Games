import java.awt.Color;
import java.awt.Dimension;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;

import javax.swing.JFrame;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.apache.batik.svggen.SVGGraphics2D;
import org.apache.batik.swing.JSVGCanvas;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Element;
import org.w3c.dom.svg.SVGDocument;

public class ViewGeneratedSVGDemo {

	public static void main(String[] args) {
		// Create an SVG document.
		DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
		String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
		SVGDocument doc = (SVGDocument) impl.createDocument(svgNS, "svg", null);

		// Create a converter for this document.
		SVGGraphics2D g = new SVGGraphics2D(doc);

		// Do some drawing.
		Shape circle = new Ellipse2D.Double(0, 0, 50, 50);
		g.setPaint(Color.red);
		g.fill(circle);
		g.translate(60, 0);
		g.setPaint(Color.green);
		g.fill(circle);
		g.translate(60, 0);
		g.setPaint(Color.blue);
		g.fill(circle);
		g.setSVGCanvasSize(new Dimension(180, 50));

		// Populate the document root with the generated SVG content.
		Element root = doc.getDocumentElement();
		g.getRoot(root);

		// Display the document.
		JSVGCanvas canvas = new JSVGCanvas();
		JFrame f = new JFrame();
		f.getContentPane().add(canvas);
		canvas.setSVGDocument(doc);
		f.pack();
		f.setVisible(true);
	}
}