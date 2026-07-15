package P18LeapYear;

import java.util.Scanner;

public class P18LeapYear {

	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Enter the year to check whether leap year or not: ");
		int year = scanner.nextInt() ;
		
		if (year% 400 == 0) {
			System.out.println(year + " is a leap year!!! divisible by 400");
		} else if (year% 100 == 0) {
			System.out.println(year + " is not a leap year!!!divisible by 100 ");
		} else if (year% 4 == 0) {
			System.out.println(year + " is a leap year!!! divisible by 4 ");
		} else {
			System.out.println(year + " is not a leap year!!!");
		}		
		scanner.close();

	}

}
