import java.util.*;
import java.util.Map.Entry;
import java.util.function.Predicate;
import java.util.stream.*;
import java.io.IOException;
import java.nio.file.*;

public class Day3 {
    public static void main(String[] args) {
        part1();
    }

    private static void part1() {
        List<String> input = readInput();
        List<Claim> claims = input.stream().map(line -> Claim.parse(line)).collect(Collectors.toList());
        Map<String, Integer> claimTotals = new HashMap<>();
        for(Claim claim: claims) {
            for(String claimedSquare: claim.claimedSquares()) {
                if(claimTotals.containsKey(claimedSquare)) {
                    claimTotals.replace(claimedSquare, claimTotals.get(claimedSquare) + 1);
                } else {
                    claimTotals.put(claimedSquare, 1);
                }
            }
        }

        Map<String, Integer> squaresClaimedTwiceOrMore = filterMapByValue(claimTotals, claimedSquareCount -> claimedSquareCount >= 2);
        int answer = squaresClaimedTwiceOrMore.size();

        System.out.println("Part 1: " + answer);
    }

    static <K, V> Map<K, V> filterMapByValue(Map<K, V> map, Predicate<V> predicate) {
        return map.entrySet()
                .stream()
                .filter(entry -> predicate.test(entry.getValue()))
                .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
    }

    private static List<String> readInput() {
        try (Stream<String> stream = Files.lines(Paths.get("input.txt"))) {
            return stream.collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println(e);
            return new ArrayList();
        }
    }

}
