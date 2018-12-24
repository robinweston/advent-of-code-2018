import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.io.IOException;
import java.nio.file.*;

public class Day2 {
    public static void main(String[] args) {
        part1();
        part2();
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
        System.out.println("Part 1: " + answer);
    }

    private static void part2() {
        List<String> ids = getIds();
        for(int i=0; i < ids.size(); i++) {
            for(int j=0; j < ids.size(); j++) {
                String id1 = ids.get(i);
                String id2 = ids.get(j);
                List<Integer> diffs = characterDiffsInString(id1, id2);
                if(diffs.size() == 1) {
                    String answer = removeChartAt(id1, diffs.get(0));
                    System.out.println("Part 2: " + answer);
                    return;
                }
            }
        }
    }

    private static String removeChartAt(String str, int charPosition) {
        return str.substring(0, charPosition) + str.substring(charPosition+1);
    }

    private static List<Integer> characterDiffsInString(String str1, String str2) {
        List<Integer> diffPositions = new ArrayList<Integer>();
        for(int i=0; i < str1.length(); i++){
            if(str1.charAt(i) != str2.charAt(i)) {
                diffPositions.add(i);
            }
        }
        return diffPositions;
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
