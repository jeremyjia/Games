package com.util;

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.HashMap;

import javax.swing.JComboBox;
import javax.swing.JFrame;

import com.SearchPathDemo;
import com.SearchPathDemo.Strategy;

public class ProDlg extends JFrame implements ItemListener {

	private static final long serialVersionUID = 6139053283251266005L;

	private static final JComboBox jComboBox = new JComboBox(
			SearchPathDemo.algorithmArray);

	private final HashMap<Strategy, String> map = new HashMap<Strategy, String>();

	public ProDlg(Strategy s) {

		setLayout(null);
		initMap();

		jComboBox.setBounds(10, 20, 150, 25);
		jComboBox.addItemListener(this);
		add(jComboBox);

		String str = map.get(s);
		jComboBox.setSelectedItem(str);

	}

	private void initMap() {
		for (int i = 0; i < SearchPathDemo.stragegyArray.length; i++) {
			map.put(SearchPathDemo.stragegyArray[i],
					SearchPathDemo.algorithmArray[i]);
		}
	}

	public void itemStateChanged(ItemEvent e) {
		if (e.getSource() == jComboBox) {
			int i = jComboBox.getSelectedIndex();
			Strategy s = SearchPathDemo.stragegyArray[i];
			SearchPathDemo.strategy = s;
		}

	}

}