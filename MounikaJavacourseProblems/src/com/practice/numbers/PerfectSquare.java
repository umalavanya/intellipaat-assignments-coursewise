package com.practice.numbers;

import java.util.Scanner;

public class PerfectSquare {

	public static void main(String[] args) {
		//Perfect square --> 
		
		// number --> square root --> 
		
		Scanner sc = new Scanner(System.in) ;
		
		
		int num = sc.nextInt();
		
		int root = (int) Math.sqrt(num) ;
		
		int num2 = root*root ;
		
		if (num == num2) {
			System.out.println(num+" is a perfect square!");
		} else {
			System.out.println(num+" is not a perfect square!");
		}			
		sc.close();

	}

}
