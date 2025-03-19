def collatz_sequence_length(n):
    steps = 0
    original = n
    max_value = n  # Track maximum value reached
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        steps += 1
        max_value = max(max_value, n)  # Update maximum value
    return original, max_value

# Find numbers with largest hailstone value
largest_hailstone = []
max_peak = float('-inf')

# Test numbers from 1 to 9999
for i in range(1, 10000):
    num, peak = collatz_sequence_length(i)
    
    if peak > max_peak:
        max_peak = peak
        largest_hailstone = [num]
    elif peak == max_peak:
        largest_hailstone.append(num)

# Print results
print(f"Numbers with largest hailstone peak of {max_peak}:")
for num in largest_hailstone:
    print(num)
