package talan.blockchain.demosecurity.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class FileUploadUtil {

    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

    public static boolean deleteFile(String uploadDir, String filename) {
        try {
            Path rootLocation = Paths.get(uploadDir);
            Path file = rootLocation.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public static Map<String, String> getFile(String imagename) throws IOException {
        String imagesPath = "images/";
        File file = new ClassPathResource(imagesPath + imagename).getFile();
        String encodeImage = Base64.getEncoder().withoutPadding().encodeToString(Files.readAllBytes(file.toPath()));
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("content", encodeImage);
        return jsonMap;
    }


}
