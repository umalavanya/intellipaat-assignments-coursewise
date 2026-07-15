package P15Voting;

import java.util.Scanner;

public class P15Voting {

	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Enter the age: ");
		double age = scanner.nextDouble() ;
		
		if (age > 18) {
			System.out.println("You are elegible to vote!!");
		} else {
			System.out.println("You are not elegible to vote!!");
		}
		
		scanner.close();
		
		

	}

}
