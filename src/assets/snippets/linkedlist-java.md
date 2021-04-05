# LinkedList

### Declaring and Adding/Inserting into a linked list

```java
LinkedList linkedList<String> = new LinkedList<String>();
linkedList.add("a");
linkedList.add("b");
linkedList.addLast("c");
linkedList.addFirst("1");
list.add(5, "End");
```

### Removing/Deleting from a linked list

```
linkedList.remove(index);//index = the position of the element
```

### Iterating a linkedlist

```java
//Using For Loop
for(int i = 0; i< linkedList.size(); i++){
  System.out.print(linkedList.get(i);
}
```

```java
//Using Advanced For
for(String x: linkedList){
  System.out.println(x);
}
```

### Getting the size of linkedlist

```java
linkedList.size()
```

### Appending linkedlist to the other

```java
LinkedList linkedList2<String> = new LinkedList<String>();
linkedList.addAll(linkedList2);
```

### Other Common Methods

```java
peek(); //Gets the element at the head of the list or a null if empty
peekFirst(); //Gets the first element of linkedlist or a null if empty
peekLast(); //Gets the last element of linkedlist
```

### Why use a linked list Summary(Limitations of using an array)

1. With Arrays, you have to declare its size at the inital point. Incase we do not know the exact size, using an array becomes disadvantageous. With a linked list, memory allocation is done at runtime therefore we do not have to specify the size before hand.
2. Deleting an item in an array is expensive because all the elements on the right side of the array have to be shifted to the left. Linked List uses a pointer that points to the moemory location of the next element on the list therefore we do not need to shift all the elements but change the memory location where a pointer is pointing to.
3. When inserting in the middle of array, all items on the right have to be shifted to the right.
