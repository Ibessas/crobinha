import pygame, sys
from pygame.locals import *
import random

class membro():
    def __init__(self,x,y):
        self.x=x
        self.y=y

class comida():
    def __init__(self,x,y):
        self.x=x
        self.y=y

class game():
    cobra=[membro(50,150)]
    comida=comida(0,0)

def main():
    pygame.init()
    MAX=500
    DISPLAY=pygame.display.set_mode((MAX,MAX),0,32)

    WHITE=(255,255,255)
    BLUE=(0,0,255)
    RED=(255,0,0)
    GREEN=(0,255,0)
    BLACK=(0,0,0)
    sides = [ 'w','a','s','d']
    direction = 'w'
    i = 0
    jogo = game

    def move():
        if direction == 'w':
            if jogo.cobra[0].y-50<0:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x,MAX-50 ))
            else:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x,jogo.cobra[0].y-50 ))
        if direction == 'a':
            if jogo.cobra[0].x-50<0:
                jogo.cobra.insert(0, membro(MAX-50,jogo.cobra[0].y ))
            else:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x-50,jogo.cobra[0].y ))
        if direction == 's':
            if jogo.cobra[0].y+50>MAX-50:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x,0))

            else:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x,jogo.cobra[0].y+50 ))
        if direction == 'd':
            if jogo.cobra[0].x+50>MAX-50:
                jogo.cobra.insert(0, membro(0,jogo.cobra[0].y ))
            else:
                jogo.cobra.insert(0, membro(jogo.cobra[0].x+50,jogo.cobra[0].y ))

        if jogo.cobra[0].x == jogo.comida.x and jogo.cobra[0].y == jogo.comida.y:
            print(jogo.cobra[0].x == jogo.comida.x,jogo.cobra[0].y == jogo.comida.y)
            jogo.cobra.append(membro(jogo.cobra[len(jogo.cobra)-1].x, jogo.cobra[len(jogo.cobra)-1].y))
            geterateFood()
        else:
            jogo.cobra = jogo.cobra[:-1]

    def paintSnake():
        paintFood()
        for el in jogo.cobra:
            index = jogo.cobra.index(el)
            if(index==0):
                pygame.draw.rect(DISPLAY,BLACK,(el.x,el.y,50,50))
                pygame.draw.rect(DISPLAY,GREEN,(el.x+23,el.y+23,4,4))
                pygame.draw.rect(DISPLAY,GREEN,(el.x,el.y,50,4))
                pygame.draw.rect(DISPLAY,GREEN,(el.x,el.y,4,50))
                pygame.draw.rect(DISPLAY,GREEN,(el.x,el.y+46,50,4))
                pygame.draw.rect(DISPLAY,GREEN,(el.x+46,el.y,4,50))
            else:
                if(index % 2 == 0):
                    pygame.draw.rect(DISPLAY,RED,(el.x,el.y,50,50))
                else:
                    pygame.draw.rect(DISPLAY,BLUE,(el.x,el.y,50,50))

    def paintFood():
        pygame.draw.rect(DISPLAY,RED,(jogo.comida.x,jogo.comida.y,50,50))


    def geterateFood():
        vazio = [] 
        for i in range(0, MAX-50, 50):
            for j in range(0, MAX-50, 50):
                candidata = membro(i,j)
                if candidata not in jogo.cobra:
                    vazio.append(candidata)
        if len(vazio) > 0:
            jogo.comida = vazio[random.randrange(0, len(vazio)-1)]
            paintFood()

    geterateFood()
    while True:
        
        i+=1
        if i>=200:
            move()
            i=0
        DISPLAY.fill(WHITE)
        paintSnake()

        for event in pygame.event.get():
            if event.type==KEYDOWN:
                if  event.unicode in sides:
                    direction = event.unicode 
            if event.type==QUIT:
                pygame.quit()
                sys.exit()
        pygame.display.update()

main()