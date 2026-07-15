package P16PassFail;

import java.util.Scanner;

public class P16PassFail {

	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Enter marks: ");
		double marks = scanner.nextDouble() ;
		
		if (marks > 35) {
			System.out.println("You passed the test!!!");
		} else {
			System.out.println("You failed the test!!!");
		}
		
		scanner.close();

	}

}
