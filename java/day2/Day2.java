import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.io.IOException;
import java.nio.file.*;

public class Day2 {
    public static void main(String[] args) {
        part1();
    }

    private static void part1() {
        List<String> ids = getIds();
        int idsWithDoubleCharacter = 0;
        int idsWithTripleCharacter = 0;
        for(String id: ids) {
            Map<Character, Integer> characterCounts = calculateCharacterCounts(id);
            if(characterCounts.values().contains(2)) {
                idsWithDoubleCharacter++;
            }
            if(characterCounts.values().contains(3)) {
                idsWithTripleCharacter++;
            }
        };

        int answer = idsWithDoubleCharacter * idsWithTripleCharacter;
        System.out.println("Part 1 Answer: " + answer);
    }

    private static void printMap(Map<Character, Integer> map) {
        Stream.of(map.entrySet().toArray()).forEach(System.out::println);
    }

    private static Character[] stringToCharacterArrays(String str) {
        return str.chars().mapToObj(c -> (char)c).toArray(Character[]::new); 
    }

    private static Map<Character, Integer> calculateCharacterCounts(String id) {
        Map<Character, Integer> counts = new HashMap<>();
        Character[] letters = stringToCharacterArrays(id);
        Arrays.stream(letters).forEach(letter -> {
            if (counts.containsKey(letter)) {
                int currentLetterCount = counts.get(letter);
                counts.replace(letter, currentLetterCount + 1);
            } else {
                counts.put(letter, 1);
            }
        });
        return counts;
    }

    private static List<String> getIds() {
        try (Stream<String> stream = Files.lines(Paths.get("input.txt"))) {
            return stream.collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println(e);
            return new ArrayList();
        }
    }
}
