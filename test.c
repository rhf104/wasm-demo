#define MEM_PAGE_BYTES 1 << 16
#define MEM_PAGES 1

extern void alert(char *msg);
extern void debugger();

unsigned long _strlen(const char *str) {
    int len = 0;
    for (; str[len] != 0; len++);
    return len;
}

void *_malloc(unsigned long size) {
    static unsigned long cur = MEM_PAGE_BYTES * MEM_PAGES;
    return (void *)(cur -= size);
}

int argsByVal(int a, int b) {
    return a + b;
}

char *editStr(char *str) {
    int len = _strlen(str);
    char *result = _malloc(len + 1);
    for (int i = 0; i < len; i++) {
        result[i] = str[i] + 1;
    }
    return result;
}

int fib(int n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

void alertTest(char *msg) {
    alert(msg);
}

int staticCount() {
    static int count = 42;
    count += 1;
    return count;
}

void add(int *a) {
    *a = *a + 1;
}

int stackAdd() {
    int b = 0;
    add(&b);
    return 1 + b;
}
