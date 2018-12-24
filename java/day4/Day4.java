import java.util.*;
import java.util.Map.Entry;
import java.util.function.Predicate;
import java.util.stream.*;
import java.io.IOException;
import java.nio.file.*;

public class Day4 {
    public static void main(String[] args) {
        part1();
        part2();
    }

    private static void part1() {
        List<GuardSleep> sleeps = parseGuardSleeps();

        Map<Integer, Integer> totalMinutesSleptByGuardId = sleeps.stream().collect(
                Collectors.groupingBy(GuardSleep::getGuardId, Collectors.summingInt(GuardSleep::totalSleepMinutes)));

        int sleepiestGuardId = keyForMaxMapValue(totalMinutesSleptByGuardId);

        List<GuardSleep> sleepiestGuardSleeps = sleeps.stream().filter(s -> s.getGuardId() == sleepiestGuardId)
                .collect(Collectors.toList());
        int sleepiestMinute = findSleepiestMinute(sleepiestGuardSleeps);

        System.out.println("Part 1: " + sleepiestGuardId * sleepiestMinute);
    }

    private static void part2() {

    }

    private static <T> T keyForMaxMapValue(Map<T, Integer> map) {
        return Collections.max(map.entrySet(), (entry1, entry2) -> entry1.getValue() - entry2.getValue()).getKey();
    }

    private static int findSleepiestMinute(List<GuardSleep> sleeps) {
        Map<Integer, Integer> minutes = new HashMap<>();
        for (GuardSleep sleep : sleeps) {
            for (int i = sleep.getStartMinute(); i < sleep.getEndMinute(); i++) {
                incrementMapValue(minutes, i);
            }
        }
        return keyForMaxMapValue(minutes);
    }

    private static <T> void incrementMapValue(Map<T, Integer> map, T key) {
        if (map.containsKey(key)) {
            map.replace(key, map.get(key) + 1);
        } else {
            map.put(key, 1);
        }
    }

    private static List<GuardSleep> parseGuardSleeps() {
        List<String> lines = readInput();

        List<GuardActivity> activities = lines.stream().map(line -> GuardActivity.parse(line))
                .collect(Collectors.toList());

        activities.sort(Comparator.comparing(GuardActivity::getDate));

        List<GuardSleep> sleeps = new ArrayList<>();

        int currentGuardId = -1;
        int currentStartMinute = -1;
        for (GuardActivity activity : activities) {
            if (activity.getActivityType() == ActivityType.BeginShift) {
                currentGuardId = activity.getGuardId();
            } else if (activity.getActivityType() == ActivityType.FallAsleep) {
                currentStartMinute = activity.getDate().getMinutes();
            } else {
                int endMinutes = activity.getDate().getMinutes();
                sleeps.add(new GuardSleep(currentGuardId, currentStartMinute, endMinutes));
            }
        }
        return sleeps;
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
