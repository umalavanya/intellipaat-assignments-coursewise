package P13Numbers;

import java.util.Scanner;

public class P13Numbers {

	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Enter a number: ");
		int num = scanner.nextInt();
		
		if(num > 0 ) {
			System.out.println("The number is a positive number.");
		} else if (num == 0) {
			System.out.println("The number is neither positive nor negative");
		} else {
			System.out.println("The number is a negative number!");
		}
		
		
		if(num%2 == 0 ) {
			System.out.println("The number is an even number");
		} else {
			System.out.println("The number is an odd number");
		}
		
		scanner.close() ;
		
		

	}

}
