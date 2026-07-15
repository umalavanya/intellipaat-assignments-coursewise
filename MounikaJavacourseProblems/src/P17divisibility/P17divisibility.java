package P17divisibility;

import java.util.Scanner;

public class P17divisibility {

	public static void main(String[] args) {
		
		//creating scanner object
		Scanner scanner = new Scanner(System.in) ;
		
		
		//Reading the number from user input
		System.out.println("Enter a number to check the divisibilty by 5 and 7: ");
		int dividend = scanner.nextInt();
		
		//Defining the array of dividers
		int[] dividers = {5,7} ;
		
		//to check the divisibilty by each element of the array 
		for(int divider : dividers) {
			System.out.println("Is "+ dividend + " divisble by "+divider +" : "+isDivisible(dividend, divider));
		}
        
		//To close the scanner
		scanner.close();
		
	}
	
	//Function to check the divisibility
	public static boolean isDivisible(int dividend, int divider) {
		return ((dividend % divider) == 0) ;
	}

}
