package com;

import java.awt.Button;
import java.awt.Checkbox;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.image.BufferedImage;
import java.util.LinkedList;
import java.util.Queue;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

import com.util.MyNode;
import com.util.MyObj;
import com.util.MyStack;
import com.util.Position;
import com.util.ProDlg;

public class SearchPathDemo extends JFrame implements MouseListener,
		ActionListener {

	private static final long serialVersionUID = 1L;

	private static SearchPathDemo instance = null;
	// get screen width
	private int width = Toolkit.getDefaultToolkit().getScreenSize().width;
	// get screen height
	private int height = Toolkit.getDefaultToolkit().getScreenSize().height;
	// frame size
	private static final int FRAMEXSIZE = 650;
	private static final int FRAMEYSIZE = 560;

	private static final int LEFT_BUTTON = 1;
	private static final int RIGHT_BUTTON = 3;
	private static final int NUM = 12;
	private static final int YES = 1;
	private static final int NO = 0;
	private static final int UP = 1;
	private static final int DOWN = 2;
	private static final int LEFT = 3;
	private static final int RIGHT = 4;

	private int nCell = 40; // cell size
	private int nX = 0; // start X position
	private int nY = 30; // start Y position

	// 1:wall,2:ball,3:path
	private int[][] allChess = new int[NUM][NUM];

	private int[][] maze = new int[NUM][NUM];
	private int[][] pathIndex = new int[NUM][NUM];

	private MyStack stack = new MyStack();
	private Queue<MyNode> queue = new LinkedList<MyNode>();

	private int click = 0;
	private Position start = new Position(1, 1);
	private Position end = new Position(2, 2);

	private Checkbox jCheckBox = new Checkbox("Show Search Path", true);
	private Button btnAbout = new Button("About");
	private Button btnProDlg = new Button("Pro");

	public enum Strategy {
		DFS0, DFS1, DFS2, DFS3, BFS, DiGui
	}

	public static final String[] algorithmArray = { "¡ú¡ý¡û¡ü", "¡û¡ý¡ú¡ü", "¡ü¡û¡ý¡ú",
			"¡ý¡ú¡ü¡û", "Breadth First Search", "Recursion" };
	public static Strategy[] stragegyArray = { Strategy.DFS0, Strategy.DFS1,
			Strategy.DFS2, Strategy.DFS3, Strategy.BFS, Strategy.DiGui };
	public static Strategy strategy = Strategy.DFS0;

	public static SearchPathDemo getInstance() {
		if (instance == null) {
			instance = new SearchPathDemo();
		}
		return instance;
	}

	private SearchPathDemo() {
		// TODO Auto-generated constructor stub
		initUI();
	}

	private void initUI() {

		this.setTitle("Search Path Demo");
		this.setSize(FRAMEXSIZE, FRAMEYSIZE);
		this.setLocation((width - FRAMEXSIZE) / 2, (height - FRAMEYSIZE) / 2);
		this.setResizable(true);
		this.setVisible(true);

		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.addMouseListener(this);
		this.setLayout(null);
		clearData();

		// UI
		int left = nX + nCell * NUM + 20;
		add(jCheckBox);
		jCheckBox.setBounds(left, nCell * 3, 120, 25);
		jCheckBox.setBackground(Color.LIGHT_GRAY);

		add(btnAbout);
		btnAbout.setBounds(left, nCell * (NUM - 1), 90, 25);
		btnAbout.addActionListener(this);
		btnAbout.setBackground(Color.LIGHT_GRAY);

		add(btnProDlg);
		btnProDlg.setBounds(left, nCell, 90, 25);
		btnProDlg.addActionListener(this);
		btnProDlg.setBackground(Color.LIGHT_GRAY);

	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println("Search Path Demo!");
		SearchPathDemo.getInstance();
	}

	public void paint(Graphics g) {

		// Double-buffering technology to prevent screen flicker
		BufferedImage bi = new BufferedImage(FRAMEXSIZE, FRAMEYSIZE,
				BufferedImage.TYPE_INT_RGB);
		Graphics g2 = bi.createGraphics();

		// Draw line
		g2.setColor(Color.darkGray);
		for (int i = 0; i <= NUM; i++) {
			g2.drawLine(nX, nY + nCell * i, nCell * NUM + nX, nY + nCell * i);
			g2.drawLine(nX + nCell * i, nY, nX + nCell * i, nCell * NUM + nY);
		}

		// Draw elements
		for (int i = 0; i < NUM; i++) {
			for (int j = 0; j < NUM; j++) {
				if (this.allChess[i][j] == 1) {
					g2.setColor(Color.GRAY);
					g2.fill3DRect(nX + i * nCell, nY + j * nCell, nCell, nCell,
							true);
				} else if (this.allChess[i][j] == 2) {
					g2.setColor(Color.pink);
					g2.fillOval(nX + i * nCell, nY + j * nCell, nCell, nCell);
				} else if (this.allChess[i][j] == 3) {
					g2.setColor(Color.pink);
					g2.fillOval(nX + i * nCell, nY + j * nCell, nCell, nCell);
					String str = "";
					g2.setColor(Color.BLUE);
					g2.setFont(new Font("ºÚÌå", Font.BOLD, 15));
					str = String.valueOf(pathIndex[i][j]);
					g2.drawString(str, nX + i * nCell + nCell / 3, nY + j
							* nCell + nCell / 2);
				}
			}
		}

		g.drawImage(bi, 0, 0, this);
	}

	private void clearData() {

		for (int i = 0; i < NUM; i++) {
			for (int j = 0; j < NUM; j++) {
				if (i == 0 || i == NUM - 1 || j == 0 || j == NUM - 1) {
					maze[i][j] = 1;
					allChess[i][j] = 1;
				} else {
					if (maze[i][j] != 1) {
						maze[i][j] = 0;
					}
					if (allChess[i][j] == 3) {
						allChess[i][j] = 0;
					}
				}
				pathIndex[i][j] = 0;
			}
		}
	}

	public void mouseClicked(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void mouseEntered(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void mouseExited(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub

		if (e.getX() <= nX + 1 * nCell || e.getX() >= nCell * (NUM - 1) + nX
				|| e.getY() <= nY + 1 * nCell
				|| e.getY() >= nCell * (NUM - 1) + nY) {
			return;
		}

		int x = (e.getX() - nX) / nCell;
		int y = (e.getY() - nY) / nCell;
		System.out.println(y + " " + x);

		if (e.getButton() == LEFT_BUTTON) {

			if (allChess[x][y] == 1)
				return;
			if (click == 0) {
				if (allChess[start.x][start.y] == 2)
					allChess[start.x][start.y] = 0;
				if (allChess[end.x][end.y] == 2)
					allChess[end.x][end.y] = 0;
				clearData();
				stack.clear();
				queue.clear();

				start.x = x;
				start.y = y;

				allChess[x][y] = 2;
				click++;
			} else {

				end.x = x;
				end.y = y;

				boolean bfind = false;
				MyNode node = null;

				if (strategy == Strategy.DFS0 || strategy == Strategy.DFS1
						|| strategy == Strategy.DFS2
						|| strategy == Strategy.DFS3) {
					bfind = searchPathDFS(start, end);
				} else if (strategy == Strategy.BFS) {
					node = searchPathBFS(start, end);
					bfind = (node != null) ? true : false;
				} else if (strategy == Strategy.DiGui) {
					bfind = findPath(start.x, start.y, end.x, end.y);
				}

				if (bfind) {
					System.out.println("Find the path!");

					if (jCheckBox.getState()) {
						while (!stack.isEmpty()) {
							MyObj obj = stack.Pop();
							allChess[obj.seat.x][obj.seat.y] = 3;
							pathIndex[obj.seat.x][obj.seat.y] = obj.index;
						}

						int i = 1;
						while (node != null) {
							allChess[node.pos.x][node.pos.y] = 3;
							pathIndex[node.pos.x][node.pos.y] = i;// node.index;
							node = node.getParent();
							i++;
						}

						for (i = 0; i < NUM; i++) {
							for (int j = 0; j < NUM; j++) {
								if (maze[i][j] == 'Y') {
									allChess[i][j] = 3;
								}
							}
						}

					} else {
						allChess[start.x][start.y] = 0;
						allChess[end.x][end.y] = 2;
					}

				} else {
					String msg = "Cannot find a path!";
					System.out.println(msg);
					JOptionPane.showMessageDialog(this, msg);

					allChess[start.x][start.y] = 0;
				}
				click = 0;

			}

		} else if (e.getButton() == RIGHT_BUTTON) {

			if (allChess[x][y] == 1) {
				allChess[x][y] = 0;
				maze[x][y] = 0;
			} else {
				allChess[x][y] = 1;
				maze[x][y] = 1;
			}
		}

		this.repaint();
	}

	public void mouseReleased(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	private boolean canPass(Position curPos) {
		if (maze[curPos.x][curPos.y] == 0) {
			return true;
		}
		return false;
	}

	private void markPos(Position curpos, int tag) {
		switch (tag) {
		case YES:
			maze[curpos.x][curpos.y] = '.';
			break;
		case NO:
			maze[curpos.x][curpos.y] = '#';
			break;
		}
	}

	private Position nexPos(Position curpos, int dir) {
		Position nextpos = null;
		if (dir == RIGHT) {
			nextpos = new Position(curpos.x + 1, curpos.y);
		} else if (dir == DOWN) {
			nextpos = new Position(curpos.x, curpos.y + 1);
		} else if (dir == LEFT) {
			nextpos = new Position(curpos.x - 1, curpos.y);
		} else if (dir == UP) {
			nextpos = new Position(curpos.x, curpos.y - 1);
		}
		return nextpos;
	}

	private int nextDirection2(int dir) {

		if (strategy == Strategy.DFS0) {
			if (dir == RIGHT) {
				return DOWN;
			} else if (dir == DOWN) {
				return LEFT;
			} else if (dir == LEFT) {
				return UP;
			}
		} else if (strategy == Strategy.DFS1) {
			if (dir == LEFT) {
				return DOWN;
			} else if (dir == DOWN) {
				return RIGHT;
			} else if (dir == RIGHT) {
				return UP;
			}
		} else if (strategy == Strategy.DFS2) {
			if (dir == UP) {
				return LEFT;
			} else if (dir == LEFT) {
				return DOWN;
			} else if (dir == DOWN) {
				return RIGHT;
			}
		} else if (strategy == Strategy.DFS3) {
			if (dir == DOWN) {
				return RIGHT;
			} else if (dir == RIGHT) {
				return UP;
			} else if (dir == UP) {
				return LEFT;
			}
		}
		return -1;
	}

	private boolean getNextPassPos(MyObj o) {
		MyObj tmp = new MyObj();
		tmp.direction = o.direction;
		tmp.seat = o.seat;

		while (tmp.direction != -1) {
			Position newpos = nexPos(tmp.seat, tmp.direction);
			if (canPass(newpos)) {
				o.seat = newpos;
				return true;
			} else {
				tmp.direction = nextDirection2(tmp.direction);
			}
		}
		return false;
	}

	private int getInitDirection() {

		int dir = -1;
		if (strategy == Strategy.DFS0) {
			dir = RIGHT;
		} else if (strategy == Strategy.DFS1) {
			dir = LEFT;
		} else if (strategy == Strategy.DFS2) {
			dir = UP;
		} else if (strategy == Strategy.DFS3) {
			dir = DOWN;
		}

		return dir;
	}

	private boolean searchPathDFS(Position start, Position end) {

		MyObj obj = new MyObj();
		int curstep = 1;
		obj.seat = start;
		obj.index = curstep;
		obj.direction = getInitDirection();
		markPos(obj.seat, YES);

		stack.Push(obj);
		MyObj curObj = new MyObj();

		while (!stack.isEmpty()) {
			curObj = stack.getTop();
			if (curObj.seat.x == end.x && curObj.seat.y == end.y)
				return true;

			if (getNextPassPos(curObj)) {

				obj = new MyObj();
				obj.direction = getInitDirection();
				obj.seat = curObj.seat;
				obj.index = ++curstep;

				stack.Push(obj);
				markPos(obj.seat, YES);

			} else {
				stack.Pop();
				markPos(curObj.seat, NO);
			}
		}
		return false;
	}

	// Breadth-First-Search
	private MyNode searchPathBFS(Position start, Position end) {

		int i = 1;
		queue.add(new MyNode(start.x, start.y, i, null));

		while (!queue.isEmpty()) {
			MyNode curNode = queue.remove();
			if (curNode.pos.x == end.x && curNode.pos.y == end.y) {
				return curNode;
			}

			int dir = 4;
			i++;
			while (dir > 0) {
				Position newPos = nexPos(curNode.pos, dir);
				if (canPass(newPos)) {
					markPos(newPos, YES);
					queue.add(new MyNode(newPos.x, newPos.y, i, curNode));
				}
				dir--;
			}
		}
		return null;
	}

	// Recursion
	private boolean findPath(int x, int y, int X, int Y) {
		if (maze[X][Y] == 'Y')
			return true;

		if (maze[x][y] == 0) {
			maze[x][y] = 'Y';
			if (findPath(x - 1, y, X, Y))
				return true;
			else if (findPath(x + 1, y, X, Y))
				return true;
			else if (findPath(x, y + 1, X, Y))
				return true;
			else if (findPath(x, y - 1, X, Y))
				return true;
			else {
				maze[x][y] = 'N';
				return false;
			}
		} else {
			return false;
		}
	}

	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub

		if (e.getSource() == btnAbout) { 
			String strMsg = "This is a maze path searching demo.\nAuthor: JiaPeng \n2011.9.25 V:1.0.0.2"
					+ "\nCurrent version:1.0.0.3\nChange date: 2016.7.30";
			JOptionPane.showMessageDialog(this, strMsg);

		} else if (e.getSource() == btnProDlg) {
			ProDlg me = new ProDlg(strategy);
			me.setVisible(true);
			me.setLocation(750, 300);
			me.setSize(300, 200);
			me.setTitle("Strategy Setting");
		}
	}
}
