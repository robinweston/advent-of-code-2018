import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.*;

public class GuardActivity {
    private Date date;
    private int guardId;
    private ActivityType activityType;

    public int getGuardId() {
        return this.guardId;
    }

    public int setGuardId(int guardId) {
        this.guardId = guardId;
        return this.guardId;
    }

    public Date getDate() {
        return date;
    }

    public ActivityType getActivityType() {
        return this.activityType;
    }

    public GuardActivity(Date date, ActivityType activityType) {
        this.date = date;
        this.activityType = activityType;
    }

    static Date parseDate(String str) {
        try {
            Pattern compile = Pattern.compile("\\[(?<date>.+)\\]");
            Matcher matcher = compile.matcher(str);
            matcher.find();
            String dateStr = matcher.group("date");
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            return format.parse(dateStr);
        } catch (Exception ex) {
            System.err.println(ex);
            return new Date();
        }
    }

    static int parseGuardId(String str) {
        Pattern compile = Pattern.compile("#(?<guardId>\\d+)");
        Matcher matcher = compile.matcher(str);
        matcher.find();
        return Integer.parseInt(matcher.group("guardId"));
    }

    public static GuardActivity parse(String input) {
        Date date = parseDate(input);

        ActivityType activityType = ActivityType.BeginShift;
        if (input.contains("wakes up")) {
            activityType = ActivityType.WakeUp;
        } else if (input.contains("falls asleep")) {
            activityType = ActivityType.FallAsleep;
        }

        GuardActivity activity = new GuardActivity(date, activityType);

        if (activityType == ActivityType.BeginShift) {
            int guardId = parseGuardId(input);
            activity.setGuardId(guardId);
        }

        return activity;
    }
}