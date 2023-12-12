def find_original_array(n, pref):
    arr = [0] * n

    for i in range(n):
        arr[i] = pref[i] ^ (arr[i - 1] if i > 0 else 0)

    return arr

n = int(input())
pref = list(map(int, input().split()))

result = find_original_array(n, pref)
print(*result)
