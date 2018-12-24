public class GuardSleep {

    private int guardId;
    private int startMinute;
    private int endMinute;

    public int totalSleepMinutes() {
        return this.endMinute - this.startMinute;
    }

    public int getGuardId() {
        return this.guardId;
    }

    public int getStartMinute() {
        return this.startMinute;
    }

    public int getEndMinute() {
        return this.endMinute;
    }

    public GuardSleep(int guardId, int startMinute, int endMinute) {
        this.startMinute = startMinute;
        this.endMinute = endMinute;
        this.guardId = guardId;
    }
}