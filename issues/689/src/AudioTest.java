import java.io.File;

import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;

public class AudioTest {

    // java -cp "./lib/*:JavaStudy-0.0.3-SNAPSHOT.jar" AudioTest 3.mp3
    // java -cp ".\lib\*;JavaStudy-0.0.3-SNAPSHOT.jar" AudioTest 3.mp3

    public static void main(String[] args) throws Exception {

        String strFileName = "1.mp3";
        if (args.length > 0) {
            strFileName = args[0];
        }

        if (!new File(strFileName).exists()) {
            System.out.println("The file " + strFileName + " doesn't exit!");
        } else {
            System.out.println("The test file is " + strFileName);
            String time = getAudioDuration(strFileName);
            System.out.println("The time of the file:" + time);
        }

    }

    public static String getAudioDuration(String filePath) throws Exception {
        MP3File file = new MP3File(filePath);
        MP3AudioHeader audioHeader = (MP3AudioHeader) file.getAudioHeader();
        int len = audioHeader.getTrackLength(); // Second
        return Integer.toString(len);
    }

}
