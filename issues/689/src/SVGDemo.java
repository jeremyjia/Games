import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.apache.batik.svggen.SVGGraphics2D;
import org.apache.batik.swing.JSVGCanvas;
import org.apache.batik.swing.gvt.GVTTreeRendererAdapter;
import org.apache.batik.swing.gvt.GVTTreeRendererEvent;
import org.apache.batik.swing.svg.GVTTreeBuilderAdapter;
import org.apache.batik.swing.svg.GVTTreeBuilderEvent;
import org.apache.batik.swing.svg.SVGDocumentLoaderAdapter;
import org.apache.batik.swing.svg.SVGDocumentLoaderEvent;
import org.w3c.dom.Element;
import org.w3c.dom.svg.SVGDocument;
import org.w3c.dom.svg.SVGElement;

public class SVGDemo {

	public static void main(String[] args) {
		// Create a new JFrame.
		JFrame f = new JFrame("Batik");
		SVGDemo app = new SVGDemo(f);

		// Add components to the frame.
		f.getContentPane().add(app.createComponents());

		// Display the frame.
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
		f.setSize(800, 800);
		f.setVisible(true);
	}

	// The frame.
	protected JFrame frame;
	// The "Load" button, which displays up a file chooser upon clicking.
	protected JButton button = new JButton("Load...");
	protected JButton Bigbutton = new JButton("放大");
	protected JButton Smallbutton = new JButton("缩小");
	protected JButton Rotatebutton = new JButton("旋转");
	protected JButton Rightbutton = new JButton("右");
	protected JButton Downbutton = new JButton("下");
	protected JButton Leftbutton = new JButton("左");
	protected JButton Upbutton = new JButton("上");
	protected JButton addbutton1 = new JButton("add矩形");
	protected JButton addbutton2 = new JButton("add圆形");
	protected JButton deletebutton = new JButton("delete");
	protected JButton savebutton = new JButton("sss");
	// The status label.
	protected JLabel label = new JLabel();
	// The SVG canvas.
	protected JSVGCanvas svgCanvas = new JSVGCanvas();
	SVGGraphics2D svgGenerator;// 一个实例生成器
	SVGDocument svgDocument;// SVGDocument实例
	SVGElement svgRoot;// SVGElement实例
	Element ele;// 通过ID获得的元素
	float n = 1;// 放大缩小按钮点击次数
	float m = 1;// 旋转按钮点击次数
	int a = 0;// x轴按钮点击次数
	int b = 0;// y轴按钮点击次数
	int x, y;// 通过鼠标点击获得的x,y轴坐标

	public SVGDemo(JFrame f) {
		frame = f;
	}

	public JComponent createComponents() {
		// Create a panel and add the button, status label and the SVG canvas.
		final JPanel panel = new JPanel(new BorderLayout());
		JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));

		p.add(button);
		p.add(Bigbutton);
		p.add(Smallbutton);
		p.add(Rotatebutton);
		p.add(Upbutton);
		p.add(Downbutton);
		p.add(Leftbutton);
		p.add(Rightbutton);
		p.add(label);
		p.add(addbutton1);
		p.add(addbutton2);
		p.add(deletebutton);
		p.add(savebutton);
		panel.add("North", p);
		panel.add("Center", svgCanvas);

		// Set the button action.
		button.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				JFileChooser fc = new JFileChooser(".");
				int choice = fc.showOpenDialog(panel);
				if (choice == JFileChooser.APPROVE_OPTION) {
					File f = fc.getSelectedFile();
					try {
						svgCanvas.setURI(f.toURL().toString());

					} catch (IOException ex) {
						ex.printStackTrace();
					}
				}
			}
		});
		// 获取点击事件的横纵坐标
		svgCanvas.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println(e.getX() + "  " + e.getY());
				System.out.println(e.getLocationOnScreen());
				System.out.println(svgCanvas.getAlignmentX());
				svgCanvas.getAlignmentX();
				x = e.getX();
				y = e.getY();
			}
		});
		// 添加正方行 利用SVGGraphics2D创建图形
		addbutton1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {

				svgDocument = svgCanvas.getSVGDocument();
				// Create a converter for this document.
				SVGGraphics2D g = new SVGGraphics2D(svgDocument);
				// Do some drawing.
				g.setPaint(Color.green);
				g.fillRect(x, y, 100, 100);
				// Populate the document root with the generated SVG content.
				Element root = svgDocument.getDocumentElement();
				g.getRoot(root);
				// Display the document.
				svgCanvas.setSVGDocument(svgDocument);

			}
		});
		// 添加圆形 除了利用SVGGraphics2D另外一种创建新图形的方法
		addbutton2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {

				svgDocument = svgCanvas.getSVGDocument();
				// Create a converter for this document.
				svgRoot = svgDocument.getRootElement();
				// 在原节点下创建一个新节点
				Element shape = svgDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
				shape.setAttribute("cx", "" + x + "");
				shape.setAttribute("cy", "" + y + "");
				shape.setAttribute("r", "66");
				shape.setAttribute("style", "fill: green");
				svgRoot.appendChild(shape);
				// Display the document.
				svgCanvas.setSVGDocument(svgDocument);
			}
		});
		// 保存
		savebutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
			}
		});
		// 删除
		deletebutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {

				svgDocument = svgCanvas.getSVGDocument();
				svgRoot = svgDocument.getRootElement();
				svgRoot.removeChild(ele);
				svgCanvas.setSVGDocument(svgDocument);
			}
		});
		/**
		 * 通过ID单独对某一个图形单独进行放大、缩小、旋转、平移等操作
		 */
		// 放大
		Bigbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				// 根据ID来放大图像
				n++;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "scale(" + n + "," + n + ")");
				svgCanvas.setSVGDocument(svgDocument);

			}
		});
		// 缩小
		Smallbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				// 根据ID来缩小图像
				n = n / 2;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "scale(" + n + "," + n + ")");
				svgCanvas.setSVGDocument(svgDocument);

			}
		});
		// 以左上角为原点旋转
		Rotatebutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {

				double roate = 3.1415926 * m * 10;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "rotate(" + roate + ")");
				svgCanvas.setSVGDocument(svgDocument);
				m++;

			}
		});
		// 左移
		Leftbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				a = a - 50;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "translate(" + a + "," + b + ")");
				svgCanvas.setSVGDocument(svgDocument);
			}
		});
		// 右移
		Rightbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				a = a + 50;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "translate(" + a + "," + b + ")");
				svgCanvas.setSVGDocument(svgDocument);
			}
		});
		// 上移
		Upbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				b = b - 50;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "translate(" + a + "," + b + ")");
				svgCanvas.setSVGDocument(svgDocument);
			}
		});
		// 下移
		Downbutton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				b = b + 50;
				svgDocument = svgCanvas.getSVGDocument();
				ele.setAttribute("transform", "translate(" + a + "," + b + ")");
				svgCanvas.setSVGDocument(svgDocument);
			}
		});

		// Set the JSVGCanvas listeners.
		svgCanvas.addSVGDocumentLoaderListener(new SVGDocumentLoaderAdapter() {
			public void documentLoadingStarted(SVGDocumentLoaderEvent e) {
				label.setText("Document Loading...");
			}

			public void documentLoadingCompleted(SVGDocumentLoaderEvent e) {
				label.setText("Document Loaded.");
				svgDocument = svgCanvas.getSVGDocument();
				ele = svgDocument.getElementById("circle2");
			}
		});

		svgCanvas.addGVTTreeBuilderListener(new GVTTreeBuilderAdapter() {
			public void gvtBuildStarted(GVTTreeBuilderEvent e) {
				label.setText("Build Started...");
			}

			public void gvtBuildCompleted(GVTTreeBuilderEvent e) {
				label.setText("Build Done.");
				frame.pack();
			}
		});

		svgCanvas.addGVTTreeRendererListener(new GVTTreeRendererAdapter() {
			public void gvtRenderingPrepare(GVTTreeRendererEvent e) {
				label.setText("Rendering Started...");
			}

			public void gvtRenderingCompleted(GVTTreeRendererEvent e) {
				label.setText("");
			}
		});

		return panel;
	}
}
