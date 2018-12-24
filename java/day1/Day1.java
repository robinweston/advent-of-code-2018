import java.io.IOException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Day1 {
  public static void main(String[] args) {
    try {
      part1();
      part2();
    } catch (Exception e) {
      System.err.println(e);
    }
  }

  private static int[] getChanges() throws IOException {
    try (Stream<String> stream = Files.lines(Paths.get("input.txt"))) {
      return stream.mapToInt(line -> Integer.parseInt(line.replace("+", ""))).toArray();
    }
  }

  private static void part1() throws IOException {
    int[] changeList = getChanges();
    int total = Arrays.stream(changeList).sum();
    System.out.println("Part 1: " + total);
  }

  private static void part2() throws IOException {
    int[] changeList = getChanges();
    int answer = findDuplicateFrequency(changeList);

    System.out.println("Part 2: " + answer);
  }

  private static int findDuplicateFrequency(int[] changeList) {
    Set<Integer> pastFrequencies = new HashSet<>();
    int currentFrequency = 0;
    int currentChangeIndex = 0;

    while(true) {
      int currentChange = changeList[currentChangeIndex];
      currentFrequency += currentChange;

      if(isDuplicateFrequency(currentFrequency, pastFrequencies)) {
        return currentFrequency;
      }

      pastFrequencies.add(currentFrequency);

      currentChangeIndex++;
      if(currentChangeIndex == changeList.length) {
        currentChangeIndex = 0;
      }
    }
  }

  private static boolean isDuplicateFrequency(int currentFrequency, Set<Integer> pastFrequencies) {
    return pastFrequencies.contains(currentFrequency);
  }

}