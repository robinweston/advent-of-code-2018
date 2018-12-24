import java.util.*;
import java.util.regex.*;

public class Claim {
    private int id;
    private int left;
    private int top;
    private int width;
    private int height;

    public Set<String> claimedSquares() {
        Set<String> squares = new HashSet<>();
        for(int i=left;i < left + width; i++) {
            for(int j=top; j < top + height; j++) {
                squares.add(i + "," + j);
            }
        }
        return squares;
    }

    public Claim(int id, int left, int top, int width, int height) {
        this.id = id;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    private static int parseNamedGroup(Matcher matcher, String groupName) {
        return Integer.parseInt(matcher.group(groupName));
    }

    public static Claim parse(String input) {
        Pattern compile = Pattern
                .compile("#(?<id>\\d+) @ (?<left>\\d+),(?<top>\\d+): (?<width>\\d+)x(?<height>\\d+)");
        Matcher matcher = compile.matcher(input);
        matcher.find();
        return new Claim(parseNamedGroup(matcher, "id"), parseNamedGroup(matcher, "left"),
                parseNamedGroup(matcher, "top"), parseNamedGroup(matcher, "width"),
                parseNamedGroup(matcher, "height"));
    }
}