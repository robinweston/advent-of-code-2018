import java.util.*;
import java.util.Map.Entry;
import java.util.function.Predicate;
import java.util.stream.*;
import java.io.IOException;
import java.nio.file.*;

public class Day3 {
    public static void main(String[] args) {
        part1();
        part2();
    }

    private static void part1() {
        List<String> input = readInput();
        List<Claim> claims = input.stream().map(line -> Claim.parse(line)).collect(Collectors.toList());
        Map<String, Integer> claimTotals = new HashMap<>();
        for (Claim claim : claims) {
            for (String claimedSquare : claim.claimedSquares()) {
                if (claimTotals.containsKey(claimedSquare)) {
                    claimTotals.replace(claimedSquare, claimTotals.get(claimedSquare) + 1);
                } else {
                    claimTotals.put(claimedSquare, 1);
                }
            }
        }

        Map<String, Integer> squaresClaimedTwiceOrMore = filterMapByValue(claimTotals,
                claimedSquareCount -> claimedSquareCount >= 2);
        int answer = squaresClaimedTwiceOrMore.size();

        System.out.println("Part 1: " + answer);
    }

    private static void part2() {
        List<String> input = readInput();
        List<Claim> claims = input.stream().map(line -> Claim.parse(line)).collect(Collectors.toList());
        Map<String, Integer> claimTotals = new HashMap<>();
        for (Claim claim1 : claims) {
            boolean foundOverlap = false;
            for (Claim claim2 : claims) {
                boolean claimsOverlap = doSetsInteresect(claim1.claimedSquares(), claim2.claimedSquares());
                if (claimsOverlap && claim1.getId() != claim2.getId()) {
                    foundOverlap = true;
                    break;
                }
            }
            if (!foundOverlap) {
                System.out.println("Part 2: " + claim1.getId());
                return;
            }
        }
    }

    static <T> boolean doSetsInteresect(Set<T> set1, Set<T> set2) {
        Set<T> intersection = new HashSet<T>(set1); // use the copy constructor
        intersection.retainAll(set2);
        return intersection.size() > 0;
    }

    static <K, V> Map<K, V> filterMapByValue(Map<K, V> map, Predicate<V> predicate) {
        return map.entrySet().stream().filter(entry -> predicate.test(entry.getValue()))
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
