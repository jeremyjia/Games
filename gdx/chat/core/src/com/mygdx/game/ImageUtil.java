import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.PixmapIO;
import com.badlogic.gdx.graphics.Texture;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.MessageDigest;

public class ImageUtil {

    private static Texture texture;

    public static Texture loadImage(final String imgUrl) {
        final String imagePath = (imgUrl);
        texture = getImageFromLocal(imagePath);
        if (texture != null) {
            return texture;
        } else {// 从网上加载
            new Thread(new Runnable() {
                @Override
                public void run() {
                    URL url;
                    try {
                        url = new URL(imgUrl);
                        URLConnection conn = url.openConnection();
                        conn.connect();
                        final InputStream is = conn.getInputStream();
                        try {
                            saveImage(imagePath, is);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        Gdx.app.postRunnable(new Runnable() {
                            @Override
                            public void run() {
                                texture = getImageFromLocal(imagePath);

                            }
                        });
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }).start();
        }
        return null;
    }


    /**
     * 从SD卡加载图片
     * 
     * @param imagePath
     * @return
     */
    public static Texture getImageFromLocal(String imagePath) {
        File file = new File(imagePath);
        if (file.exists()) {
            file.setLastModified(System.currentTimeMillis());
            try {
                final FileInputStream fis = new FileInputStream(imagePath);
                Texture tures = new Texture(new FileHandle("image.jpg") {
                    @Override
                    public InputStream read() {
                        return fis;
                    }
                });
                return tures;
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }


        }
        return null;
    }

    public static void savePixmap(String imagePath, Pixmap pixmap){
        File f = new File(imagePath);
        if (f.exists()) {
            return;
        } else {
            File parentFile = f.getParentFile();
            if (!parentFile.exists()) { parentFile.mkdirs();
            }
            try {
                f.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            FileHandle fh=new FileHandle(f);
            PixmapIO.writePNG(fh,pixmap);
        }
    }


    /**
     * 保存图片到SD卡
     * 
     * @param imagePath
     * @param
     * @throws IOException
     */
    public static void saveImage(String imagePath, InputStream is)
            throws IOException {
        File f = new File(imagePath);
        if (f.exists()) {
            return;
        } else {
            File parentFile = f.getParentFile();
            if (!parentFile.exists()) {
                parentFile.mkdirs();
            }
            f.createNewFile();
            FileOutputStream fos = new FileOutputStream(imagePath);
            try {
                fos.write(readStream(is));
                fos.flush();
                fos.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 将InputStream转换成byte数组
     */
    public static byte[] readStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, len);
        }
        outStream.close();
        //inStream.close();
        return outStream.toByteArray();
    }


    public static String md5(String paramString) {
        String returnStr;
        try {
            MessageDigest localMessageDigest = MessageDigest.getInstance("MD5");
            localMessageDigest.update(paramString.getBytes());
            returnStr = byteToHexString(localMessageDigest.digest());
            return returnStr;
        } catch (Exception e) {
            return paramString;
        }
    }


    /**
     * 将指定byte数组转换成16进制字符串
     */
    public static String byteToHexString(byte[] b) {
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < b.length; i++) {
            String hex = Integer.toHexString(b[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            hexString.append(hex.toUpperCase());
        }
        return hexString.toString();
    }


}
