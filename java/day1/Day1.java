import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;

public class Day1 {
  public static void main(String[] args) {
    try {
      run();
    } catch (Exception e) {
      System.err.println(e);
    }
  }

  public static void run() throws IOException {
    try (Stream<String> stream = Files.lines(Paths.get("input.txt"))) {
      int total = stream.mapToInt(line -> Integer.parseInt(line.replace("+", ""))).sum();
      System.out.println("Total: " + total);
    }
  } 
}